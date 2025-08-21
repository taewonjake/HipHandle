import type { RuleId } from "../types";
import { initialLetters } from "./initialLetters";
import { leet } from "./leet";
import { reverse } from "./reverse";
import { applyNickname } from "./nickname";
import { hangulQwerty } from "./hangulQwerty";
import { birthdayInsert } from "./birthdayInsert";
import { keyboardMash } from "./keyboardMash";
import { minimizeSymbols } from "./minimizeSymbols";
import { reduceConsonants } from "./reduceConsonants";

export type RuleExec = (base: string, ctx: { name?: string; nickname?: string; birthday?: string; favoriteText?: string; }) => string;

export const RuleMap: Record<RuleId, { fn: RuleExec; tag: string; }> = {
  initialLetters: { fn: (b, ctx)=> initialLetters(ctx.favoriteText || b), tag: "앞글자" },
  leet:           { fn: leet, tag: "숫자치환" },
  reverse:        { fn: reverse, tag: "역순" },
  nickname:       { fn: (b, ctx)=> applyNickname(b, ctx.nickname), tag: "별명" },
  hangulQwerty:   { fn: (b, ctx)=> hangulQwerty(ctx.name || b), tag: "한글자판" },
  birthdayInsert: { fn: (b, ctx)=> birthdayInsert(b, ctx.birthday), tag: "생일삽입" },
  keyboardMash:   { fn: keyboardMash, tag: "키보드매시업" },
  minimizeSymbols:{ fn: minimizeSymbols, tag: "특수최소" },
  reduceConsonants:{ fn: reduceConsonants, tag: "자음정리" },
};

export const AllRuleIds = Object.keys(RuleMap) as RuleId[];
