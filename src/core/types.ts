export type RuleId =
  | "initialLetters" | "leet" | "reverse" | "nickname"
  | "hangulQwerty" | "birthdayInsert" | "keyboardMash"
  | "minimizeSymbols" | "reduceConsonants";

export type InputPayload = {
  name?: string;
  nickname?: string;
  birthday?: string;        // YYYY-MM-DD
  favoriteText?: string;
  selectedRules: RuleId[];
  hipLevel: number;         // 0..100
};

export type Candidate = { handle: string; tags: string[] };
