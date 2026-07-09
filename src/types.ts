export interface QuestionnaireState {
  occupation: string;
  yearsToSell: number;
  sleep: string;
  mondayMeetings: string;
  imFine: string;
  gasStationSushi: string;
  energyDrinks: string;
  termsAndConditions: string;
  familyChat: string;
  touchedGrass: string;
  exercise: string;
  stress: string;
  caffeine: string;
  workHours: string;
  narrowDisaster: string;
  wonAnything: string;
  blackCats: string;
  optimistic: string;
  redButton: string;
  trustStrangers: string;
  paymentMethod: string;
  paymentName: string;
  paymentRouting: string;
  paymentAccount: string;
  verifiedDocType: string; // "passport" | "license" | "id"
}

export const INITIAL_STATE: QuestionnaireState = {
  occupation: "",
  yearsToSell: 10,
  sleep: "",
  mondayMeetings: "",
  imFine: "Hourly",
  gasStationSushi: "",
  energyDrinks: "1-3",
  termsAndConditions: "Never, I click and pray",
  familyChat: "Yes, with severe psychological scars",
  touchedGrass: "",
  exercise: "Does typing fast count?",
  stress: "",
  caffeine: "More espresso, less depresso",
  workHours: "Sensible 40 hours",
  narrowDisaster: "Yes, multiple times",
  wonAnything: "Only arguments in my shower",
  blackCats: "They run away",
  optimistic: "Cautiously cynical",
  redButton: "Immediately",
  trustStrangers: "As much as a wet cardboard box",
  paymentMethod: "Bank Account",
  paymentName: "",
  paymentRouting: "",
  paymentAccount: "",
  verifiedDocType: "passport",
};

export const OCCUPATIONS = [
  "Software Engineer",
  "Teacher",
  "Plumber",
  "Professional Gambler",
  "Influencer",
  "Pirate (Retired)",
  "Unlicensed Alchemist",
  "Bureaucratic Scribe",
  "Corporate Familiar",
  "Underworld Negotiator"
];

export interface QuizQuestion {
  id: keyof QuestionnaireState;
  text: string;
  section: string;
  options: { label: string; modifier: number }[]; // Value multiplier/modifier for satirical valuation
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "sleep",
    text: "How many hours of sleep do you average per solar cycle?",
    section: "Lifestyle Debits",
    options: [
      { label: "0-4 hours (Ascetic / Undead)", modifier: -1500 },
      { label: "5-7 hours (Compromised)", modifier: 800 },
      { label: "8-9 hours (Bourgeois)", modifier: 3500 },
      { label: "10+ hours (Comatose / Sloth)", modifier: -500 }
    ]
  },
  {
    id: "mondayMeetings",
    text: "Do you willingly attend corporate Monday morning stand-up meetings?",
    section: "Lifestyle Debits",
    options: [
      { label: "Yes, eagerly (Suspiciously compliant)", modifier: -5000 },
      { label: "Yes, while weeping internally", modifier: 2500 },
      { label: "No, I fake localized medical emergencies", modifier: 4500 },
      { label: "I host them (I am the architect of torment)", modifier: -8000 }
    ]
  },
  {
    id: "gasStationSushi",
    text: "Have you ever consumed raw fish purchased from a petroleum refueling station?",
    section: "Lifestyle Debits",
    options: [
      { label: "Never (Self-preservation intact)", modifier: 3000 },
      { label: "Once, spent three days hallucinating ancient gods", modifier: -4000 },
      { label: "It is my primary source of sodium and courage", modifier: -12000 }
    ]
  },
  {
    id: "touchedGrass",
    text: "When did you last physically contact living lawn vegetation (touched grass)?",
    section: "Lifestyle Debits",
    options: [
      { label: "This morning (Ground-connected)", modifier: 5000 },
      { label: "This month, briefly", modifier: 2000 },
      { label: "No, I have synthetic turf under my desk for texture", modifier: -2000 },
      { label: "What is 'grass'? Is it a new JavaScript library?", modifier: -8000 }
    ]
  },
  {
    id: "stress",
    text: "Describe your current average stress levels:",
    section: "Vital Diagnostics",
    options: [
      { label: "Zen Monk (Suspiciously calm)", modifier: 7000 },
      { label: "Standard baseline human anxiety", modifier: 2000 },
      { label: "Slightly but constantly vibrating", modifier: -2500 },
      { label: "A localized, self-contained high-pressure storm system", modifier: -7500 }
    ]
  }
];
