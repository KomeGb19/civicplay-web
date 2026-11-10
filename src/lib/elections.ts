/**
 * Data for the /elections page.
 * Every record carries a source and an "as of" date so it can be reviewed and updated in git.
 * Primary sources (INEC, NBS, World Bank, IMF) always win over news reports.
 */

export const ELECTION_META = {
  lastUpdated: "10 November 2026",
  // Voting opens 8:30 AM West Africa Time (UTC+1)
  voteStartISO: "2027-01-16T08:30:00+01:00",
} as const;

export const INEC_LINKS = {
  calendar: "https://www.inecnigeria.org/elections/calendar",
  parties: "https://www.inecnigeria.org/parties",
  education: "https://www.inecnigeria.org/voters/education",
  voterStatus: "https://cvr.inecnigeria.org/vvs",
  pollingUnit: "https://cvr.inecnigeria.org/pu",
  results: "https://inecelectionresults.ng/",
} as const;

export const KEY_DATES = [
  {
    id: "pres",
    label: "Presidential and National Assembly elections",
    value: "Saturday, 16 January 2027",
    detail:
      "Nationwide, in all 36 states and the FCT. You vote for the President and Vice-President, a Senator and a House of Representatives member.",
  },
  {
    id: "gov",
    label: "Governorship and State House of Assembly elections",
    value: "Saturday, 6 February 2027",
    detail: "Only in participating states and state constituencies.",
  },
  {
    id: "hours",
    label: "Accreditation and voting hours",
    value: "8:30 AM to 2:30 PM",
    detail:
      "Accreditation and voting happen at the same time. Your PVC is verified with the BVAS machine.",
  },
] as const;

export type TicketStatus = "listed" | "in-court";

export type Ticket = {
  party: string;
  partyName: string;
  president: string;
  runningMate: string;
  status: TicketStatus;
  note?: string;
};

/** Alphabetical by party abbreviation. Source: INEC final list published 12 Sept 2026, as reported. */
export const TICKETS: Ticket[] = [
  { party: "AA", partyName: "Action Alliance", president: "Rufai Adekunle Omo-Aje", runningMate: "Shehu Hussaini", status: "listed" },
  { party: "AAC", partyName: "African Action Congress", president: "Omoyele Sowore", runningMate: "Haruna Garba Magashi", status: "listed" },
  {
    party: "ADC",
    partyName: "African Democratic Congress",
    president: "Atiku Abubakar",
    runningMate: "Chibuike Rotimi Amaechi",
    status: "in-court",
    note: "On 5 Nov 2026 a Federal High Court judgment voided the party’s leadership and the primary that nominated this ticket. The party says it will appeal. As of 9 Nov, INEC said it had not yet received the certified judgment and had taken no decision.",
  },
  { party: "ADP", partyName: "Action Democratic Party", president: "Aliyu Abbas-Bin", runningMate: "Chinazam Ike", status: "listed" },
  { party: "APC", partyName: "All Progressives Congress", president: "Bola Ahmed Tinubu", runningMate: "Kashim Shettima", status: "listed" },
  { party: "APM", partyName: "Allied Peoples Movement", president: "Oluseyi Abiodun Makinde", runningMate: "Musa Lawal Daura", status: "listed" },
  { party: "APP", partyName: "Action Peoples Party", president: "Kabiru Yusuf", runningMate: "Peace Egobia Ofordile", status: "listed" },
  { party: "BP", partyName: "Boot Party", president: "Sunday Adenuga", runningMate: "Usman Turaki Mustapha", status: "listed" },
  { party: "DLA", partyName: "Democratic Leadership Alliance", president: "Moses Olusoji Adebisi", runningMate: "Nafisat Usaku Abubakar", status: "listed" },
  { party: "LP", partyName: "Labour Party", president: "Sunday Chibuzo Okereke", runningMate: "Hajja Bintu Konto", status: "listed" },
  { party: "NDC", partyName: "Nigeria Democratic Congress", president: "Peter Gregory Obi", runningMate: "Rabiu Musa Kwankwaso", status: "listed" },
  { party: "NDP", partyName: "National Democratic Party", president: "Ada Elizabeth Fredrick Okwori", runningMate: "Uchenna Anthony Chukwuemeka", status: "listed" },
  { party: "NRM", partyName: "National Rescue Movement", president: "Nkem Esther Okereke", runningMate: "Nasir Muhammed Sulaiman", status: "listed" },
  { party: "PDP", partyName: "Peoples Democratic Party", president: "Sandy Ojang Onor", runningMate: "Umaru Babangida", status: "listed" },
  { party: "PRP", partyName: "Peoples Redemption Party", president: "Donald Duke", runningMate: "Kabiru Rabiu", status: "listed" },
  { party: "SDP", partyName: "Social Democratic Party", president: "Adewole Ebenezer Adebayo", runningMate: "Usman Muhammed Bugaje", status: "listed" },
  { party: "YPP", partyName: "Young Progressive Party", president: "Peter Ada Agada", runningMate: "Patience Ndidi Key", status: "listed" },
  { party: "ZLP", partyName: "Zenith Labour Party", president: "Daniel Daberechukwu Nwanyanwu", runningMate: "Hassan Khalid", status: "listed" },
];

export const VOTER_FACTS = {
  register: "Over 103 million",
  registerAsOf: "late September 2026",
  registrationPhases: [
    { label: "Phase 1 (Aug to Dec 2025)", value: 2.611266, display: "2.61 million" },
    { label: "Phase 2 (Jan to Apr 2026)", value: 4.121835, display: "4.12 million" },
    { label: "Phase 3 (May to Jul 2026)", value: 3.867997, display: "3.87 million" },
  ],
  max: 5,
  note: "INEC also reported removing about 1.6 million flagged entries from the register on 9 and 10 November 2026, and said 54 officials in 10 states may face prosecution over registration infractions. Totals will change as that work continues.",
  sources: [
    { label: "Premium Times (INEC announcement)", url: "https://www.premiumtimesng.com/news/top-news/914671-2027-inec-sets-date-for-pvc-collection.html" },
    { label: "Tribune (register clean-up)", url: "https://tribuneonlineng.com/2027-inec-cleans-voters-register-removes-1-6million-invalid-entries-may-prosecute-54-officials/" },
  ],
} as const;

export type Stat = {
  id: string;
  title: string;
  unit: string;
  asOf: string;
  bars: { label: string; value: number; display: string }[];
  max: number;
  tone?: "green" | "gold";
  takeaway: string;
  caveat: string;
  sources: { label: string; url: string }[];
};

export const STATS: Stat[] = [
  {
    id: "inflation",
    title: "Headline inflation (year on year)",
    unit: "Percent",
    asOf: "September 2026",
    bars: [
      { label: "Sep 2025", value: 20.98, display: "20.98%" },
      { label: "Aug 2026", value: 15.39, display: "15.39%" },
      { label: "Sep 2026", value: 14.63, display: "14.63%" },
    ],
    max: 25,
    tone: "green",
    takeaway:
      "Prices are still rising, but more slowly than a year ago. Food inflation was 19.59% in September 2026, and core inflation was 12.95%.",
    caveat:
      "NBS rebased its price index in January 2025, so 2023 and 2024 figures can’t be compared directly with today’s. The World Bank says inflation has stalled around 15.5% in 2026, which it describes as more than double the rate in peer countries.",
    sources: [
      { label: "NBS figures via Vanguard", url: "https://www.vanguardngr.com/2026/10/breaking-nigerias-inflation-rate-drops-to-14-63/" },
      { label: "World Bank view via Nairametrics", url: "https://nairametrics.com/2026/10/18/nigerias-inflation-mirage-food-prices-fall-but-core-pressures-mount/" },
    ],
  },
  {
    id: "growth",
    title: "Economic growth (real GDP, year on year)",
    unit: "Percent",
    asOf: "Q2 2026",
    bars: [
      { label: "Q2 2025", value: 4.23, display: "4.23%" },
      { label: "Q1 2026", value: 3.89, display: "3.89%" },
      { label: "Q2 2026", value: 4.43, display: "4.43%" },
    ],
    max: 6,
    tone: "gold",
    takeaway:
      "The economy has grown by roughly 4% a year recently. The World Bank forecasts 4.3% for 2026 and the IMF 4.2%.",
    caveat:
      "Growth in the whole economy doesn’t tell you how much better off an average household is. Read it alongside prices and poverty.",
    sources: [
      { label: "NBS figures via Nigeria Housing Market", url: "https://www.nigeriahousingmarket.com/news/nigeria-economy-growth-inflation-oil-output-2026" },
      { label: "Forecasts via Nairametrics", url: "https://nairametrics.com/2026/10/18/nigerias-inflation-mirage-food-prices-fall-but-core-pressures-mount/" },
    ],
  },
];

export const POVERTY_ESTIMATES = [
  { text: "More than 60% of Nigerians", from: "Estimate cited in a Punch editorial", url: "https://thecitizenng.com/three-years-of-tinubu-reforms-punch/" },
  { text: "About 63% of Nigerians", from: "Figure cited in an energy-sector review", url: "https://www.energyfocusreport.com/tinubu-the-audacity-to-hope-three-years-after/" },
  { text: "More than three-quarters in multidimensional poverty", from: "Commentary in Prompt News", url: "https://promptnewsonline.com/a-scorecard-of-tinubus-three-years-in-office-by-kazeem-akintunde/" },
] as const;

export const GOVERNMENT_CLAIMS = [
  { text: "Removing the petrol subsidy and unifying exchange-rate windows were necessary corrections to the economy.", url: "https://dailytimesng.com/three-years-of-the-tinubu-administration-a-complex-ledger-of-hardship-and-reform/", source: "Daily Times" },
  { text: "The President’s 1 October 2026 address said the economy grew by more than 4% in 2026, inflation fell from its peak, reserves were rebuilt and the foreign-exchange market stabilised.", url: "https://www.nigeriahousingmarket.com/news/nigeria-economy-growth-inflation-oil-output-2026", source: "Nigeria Housing Market" },
  { text: "The government says ₦282 billion has been paid through NELFUND to more than 1.5 million students.", url: "https://thecitizenng.com/three-years-of-tinubu-reforms-punch/", source: "Punch via The Citizen" },
  { text: "The President says many communities and highways are becoming safer and more economically active.", url: "https://thecitizenng.com/three-years-of-tinubu-reforms-punch/", source: "Punch via The Citizen" },
] as const;

export const CRITIC_CLAIMS = [
  { text: "Atiku Abubakar, a presidential candidate, says the record is one of hardship, insecurity and poverty.", url: "https://leadership.ng/tinubus-3-yr-scorecard-written-in-hunger-poverty-tears-of-abducted-kids-atiku/", source: "Leadership" },
  { text: "The ADC says citizens have lost confidence in the government because of hardship, unemployment and insecurity.", url: "https://newnationalstar.com/three-years-on-evaluating-tinubus-presidency/", source: "New National Star" },
  { text: "Afenifere, a Yoruba socio-political group, criticised the economic hardship, insecurity, unemployment and the state of democratic institutions.", url: "https://newnationalstar.com/three-years-on-evaluating-tinubus-presidency/", source: "New National Star" },
  { text: "Some commentators say the macroeconomic gains have not yet reached ordinary households.", url: "https://promptnewsonline.com/a-scorecard-of-tinubus-three-years-in-office-by-kazeem-akintunde/", source: "Prompt News" },
] as const;

export const PRIMARY_SOURCES = [
  { label: "Independent National Electoral Commission (INEC)", url: "https://www.inecnigeria.org/" },
  { label: "National Bureau of Statistics (NBS)", url: "https://nigerianstat.gov.ng/" },
  { label: "World Bank: Nigeria", url: "https://www.worldbank.org/en/country/nigeria" },
  { label: "IMF: Nigeria", url: "https://www.imf.org/en/Countries/NGA" },
  { label: "ACLED conflict data", url: "https://acleddata.com/" },
] as const;
