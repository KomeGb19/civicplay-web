export type ChapterId =
  | "hook"
  | "problem"
  | "product"
  | "howto"
  | "proof"
  | "cta";

export type Chapter = {
  id: ChapterId;
  /** Scroll progress window [start, end] within 0–1 master timeline */
  range: [number, number];
  headline: string;
  subline?: string;
  bg: string;
};

export const CHAPTERS: Chapter[] = [
  {
    id: "hook",
    range: [0, 0.14],
    headline: "LEARN CIVICS.\nPLAY TO WIN.",
    subline: "Nigeria’s civic education game for students & citizens.",
    bg: "#0b1f3a",
  },
  {
    id: "problem",
    range: [0.14, 0.3],
    headline: "DEMOCRACY NEEDS\nPLAYERS, NOT\nSPECTATORS.",
    subline:
      "Low youth turnout. Online misinformation. Civic knowledge gaps. Civic Play meets young people where they already are, in play.",
    bg: "#0a2744",
  },
  {
    id: "product",
    range: [0.3, 0.48],
    headline: "QUIZ. COMPETE.\nLEVEL UP YOUR\nCIVIC IQ.",
    subline:
      "Test what you know about government, democracy, and citizenship, then climb the board with friends.",
    bg: "#0d3b2e",
  },
  {
    id: "howto",
    range: [0.48, 0.68],
    headline: "LEVELS. TIMERS.\nSTREAKS. SCORES.",
    subline:
      "Timed questions, instant feedback, and progress tracking turn civic learning into a game you want to finish.",
    bg: "#123a2a",
  },
  {
    id: "proof",
    range: [0.68, 0.84],
    headline: "BUILT FOR IMPACT.\nBACKED BY VOICES\nTHAT MATTER.",
    subline:
      "“Finding an avenue to get young people interested in civic obligation is innovative and welcoming” — Chiamaka Okafor-Onumah, MILID Foundation",
    bg: "#1a2f4a",
  },
  {
    id: "cta",
    range: [0.84, 1],
    headline: "READY TO PLAY\nYOUR PART?",
    subline: "Join Nigeria’s civic quiz arena. Learn. Compete. Strengthen democracy.",
    bg: "#0b1f3a",
  },
];

export const LINKS = {
  play: "/play",
  contactMailto: "mailto:contact@civicplay.ng",
  phone1: "tel:+2349130497799",
  phone2: "tel:+2348160379312",
  twitter: "https://x.com/civicplayng",
  instagram: "https://www.instagram.com/civicplayng",
  tiktok: "https://www.tiktok.com/@civicplayng",
  donate: {
    bank: "Zenith Bank",
    accountName: "Roundcheck Media",
    accountNumber: "1228957819",
  },
} as const;

export function chapterAtProgress(progress: number): Chapter {
  for (const chapter of CHAPTERS) {
    if (progress >= chapter.range[0] && progress < chapter.range[1]) {
      return chapter;
    }
  }
  return CHAPTERS[CHAPTERS.length - 1];
}
