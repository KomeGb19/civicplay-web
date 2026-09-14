CivicPlay: single-app game inside civicplay-web

Architecture decision

One project: civicplay-web. Landing stays at /; game lives under /play/*.

No Express. Use Next.js App Router Route Handlers (src/app/api/...) + MongoDB Atlas. Same deploy target as the landing (Vercel). Express would only add a second process and CORS/auth glue.

Reuse from CivicPlay: question banks, scoring (+10), 15 questions/round, 15s timer, confirm → explanation, level unlock at 90/150, share-score copy. Discard: index.html, styles.css, DOM wiring in quiz.js.

flowchart TB
  subgraph client [Next.js client]
    Landing["/ landing"]
    PlayHub["/play hub"]
    Onboard["/play/onboarding avatar + username"]
    Quiz["/play/quiz level"]
    Results["/play/results + share"]
    Board["/play/leaderboard"]
  end
  subgraph api [Route Handlers]
    AuthAPI["Auth.js email Google guest"]
    QAPI["questions + submit score"]
    LBAPI["leaderboard"]
  end
  Mongo[(MongoDB Atlas)]
  Landing --> PlayHub
  PlayHub --> Onboard
  Onboard --> Quiz
  Quiz --> Results
  Results --> Board
  PlayHub --> AuthAPI
  Quiz --> QAPI
  Board --> LBAPI
  AuthAPI --> Mongo
  QAPI --> Mongo
  LBAPI --> Mongo

Auth (email + Google + guest)





Auth.js (NextAuth v5) with MongoDB adapter



Providers: Credentials (email/password) + Google



Guest mode: create a lightweight guest session (cookie) with role: "guest", no password; require avatar + username before first quiz (same onboarding as registered users who skip profile)



Guests can play and appear on leaderboard by username; prompt “Save progress / Sign up” after a strong score so they can link scores later (optional merge by session id → user id)

Data model (MongoDB)





users — email, password hash (if credentials), googleId, username, avatarId, best scores per level



accounts / sessions — Auth.js collections



questions — { level: basic|intermediary|advance, text, options[4], correctIndex, explanation } seeded from old BASIC_QUESTIONS / etc.



scores — { userId?, guestId?, username, avatarId, level, score, createdAt } for leaderboard (top 10 per level)

Env: MONGODB_URI, AUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL.

App routes (game)







Route



Purpose





/play



Hub: auth CTAs, level select (locks), leaderboard entry





/play/onboarding



Pick avatar + create username





/play/quiz/[level]



Timed quiz round





/play/results



Score, confetti, share, unlock next





/play/leaderboard



Per-level boards





/login, /signup



Auth screens styled like game

Point landing LINKS.play in src/lib/chapters.ts from external play.civicplay.ng → /play.

Gamified UI stack (concrete choices)

Stay on the landing design system (navy / green / gold / cream, Syne + DM Sans in globals.css). Do not introduce a second visual language.







Need



Library



Why





Base UI



Existing shadcn + Tailwind 4



Already in repo





Screen / answer / UI motion



motion (already installed)



Enter/exit, layout springs, gesture press





Timer ring, scripted sequences



gsap (already installed)



Smooth SVG countdown ring + urgency timeline





Confetti blast



canvas-confetti



Lightweight, brand-colored bursts on correct / level clear





Score ticker



@number-flow/react



Cinematic counting score/XP





Optional Lottie moments



lottie-react only if you add 1–2 celebration JSONs later



Skip for v1 unless needed

Avatars: curated set of ~12 civic/mascot illustrations in public/avatars/ (SVG/PNG), stored as avatarId on user/guest — no DiceBear dependency for brand control.

Avoid for v1: Phaser/Pixi (overkill for a quiz), heavy particle engines, purple “AI SaaS” kit themes.

Animation set for the gamified feel

Must-ship (you asked for these)





Confetti blast — correct answer streaks + round complete (green/gold particles)



Score ticker — NumberFlow springs when points land (+10 pop)



Timer animation — circular SVG ring draining 15→0; at ≤5s: coral pulse + mild screen shake; at 0: lock + flash

Strongly recommended additions 4. Answer card press — scale down on tap, spring back 5. Correct / wrong feedback — green pulse + check burst vs coral shake + X 6. Explanation slide-in — panel rises after confirm (matches old game’s teach moment) 7. Streak flame — consecutive corrects show combo badge (2x, 3x…) with short scale-in 8. Level unlock reveal — locked card → gold shatter/glow → “UNLOCKED” 9. XP / progress bar — fill toward 90 unlock threshold on results 10. Question enter — options stagger in (40–60ms cascade) 11. Hub level cards — hover lift + parallax highlight (subtle; reuse brand motion vocabulary) 12. Leaderboard climb — new rank row highlights and slides into place 13. Share button success — checkmark morph + brief confetti sprinkle 14. Onboarding avatar select — selected ring bounce + username typewriter/caret feel 15. Reduced motion — respect prefers-reduced-motion: instant states, no confetti/shake

SFX (stretch): reuse old music.mp3 mute toggle + short Web Audio ticks for correct/wrong/timer warn (no new audio library required).

Folder layout (additions)

src/
  app/
    play/...
    login/ signup/
    api/auth/[...nextauth]/
    api/questions/ api/scores/ api/leaderboard/ api/profile/
  components/play/     # QuizShell, TimerRing, ScoreTicker, AvatarPicker, LevelCard, ConfettiBurst, ShareScore
  lib/
    auth.ts db.ts quiz-engine.ts
    questions/seed.ts  # ported banks
  models/              # mongoose User Question Score

Quiz engine (port, don’t rewrite rules)

Extract pure TS from old quiz.js:





Shuffle bank → take 15



Confirm locks answer; +10 if correct; show explanation



Timer expiry locks without points, reveals correct



Persist best per level; unlock next when best ≥ 90



Submit final score to API for global leaderboard (replace localStorage-only boards)

Phased build order





Foundation — MongoDB + Auth.js (email/Google/guest) + env example



Onboarding — avatar grid + username uniqueness check



Seed questions — migrate banks from CivicPlay → Mongo



Quiz UI + engine — timer ring, explanations, levels/locks



Results + confetti + share — social share links from old HTML pattern



Leaderboard API + page



Wire landing Play CTAs → /play; polish animations + reduced-motion

Out of scope for this v1





Admin CMS for questions (seed + scripted updates instead)



Separate Express/API subdomain



Porting old CSS/HTML UI

