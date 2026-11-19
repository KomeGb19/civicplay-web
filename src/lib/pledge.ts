/**
 * Content for the /pledge page.
 * Three promises, one per step. Keep the wording nonpartisan and lawful.
 */

export type PledgeStep = {
  id: string;
  /** Short label shown in the stepper */
  label: string;
  emoji: string;
  headline: string;
  promise: string;
  bullets: string[];
  /** Short line shown on the share card */
  cardLine: string;
  note?: string;
};

export const PLEDGE_STEPS: PledgeStep[] = [
  {
    id: "conscience",
    label: "Vote",
    emoji: "🗳️",
    headline: "I will vote my conscience",
    promise:
      "I will vote with my own PVC, and I will never sell or buy a vote.",
    bullets: [
      "I will collect and use my own PVC.",
      "I won’t take money or gifts in exchange for my vote.",
      "I won’t pressure anyone to vote my way.",
    ],
    cardLine: "I will vote my conscience",
    note: "Vote buying and selling is a crime under Section 22 of the Electoral Act 2026: a fine of at least ₦5 million, at least two years in prison, or both.",
  },
  {
    id: "peace",
    label: "Peace",
    emoji: "🕊️",
    headline: "I will keep the peace",
    promise:
      "I will respect other people’s right to choose, in person and online.",
    bullets: [
      "No threats, violence or intimidation.",
      "No hate speech or ethnic or religious incitement.",
      "I will argue about ideas, not insults.",
    ],
    cardLine: "I will keep the peace",
  },
  {
    id: "process",
    label: "Sign",
    emoji: "✍️",
    headline: "I will protect the process",
    promise:
      "I will check before I share, and I will use lawful means if I disagree.",
    bullets: [
      "I will verify before I share, with no fake news or doctored images.",
      "I will follow lawful instructions from INEC and security officials.",
      "If I disagree with a result, I will go to the courts and tribunals, never to violence.",
    ],
    cardLine: "I will protect the process",
  },
];

export const STEPPER_STEPS = PLEDGE_STEPS.map((s) => ({
  id: s.id,
  title: s.label,
}));

export const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
  "FCT Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina",
  "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo",
  "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
] as const;

/** Emoji “people” for the welcome screen. Swap for real illustrations later. */
export const WELCOME_AVATARS = [
  { avatar: "/avatars/avatar1.jpg", tone: "bg-white" },
  { avatar: "/avatars/avatar2.jpg", tone: "bg-white" },
  { avatar: "/avatars/avatar3.jpg", tone: "bg-white" },
  { avatar: "/avatars/avatar4.jpg", tone: "bg-white" },
  { avatar: "/avatars/avatar5.jpg", tone: "bg-white" },
  { avatar: "/avatars/avatar6.jpg", tone: "bg-white" },
] as const;

export const STORAGE_KEY = "civicplay:pledge";

export const SHARE_TEXT =
  "I just took the Civic Play pledge: I will vote my conscience, keep the peace, and protect the process in the 2027 elections. Join me:";
