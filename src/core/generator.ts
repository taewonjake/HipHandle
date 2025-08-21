import { DEFAULT_CANDIDATE_COUNT } from "../lib/config";
import { RuleMap } from "./rules";
import { Candidate, InputPayload, RuleId } from "./types";
import { normalize } from "./utils/text";
import { shuffle } from "./utils/random";

/**
 * 기본 씨앗 문자열을 만든다.
 */
function baseSeeds(input: InputPayload): string[] {
  const seeds: string[] = [];
  const n = normalize(input.name);
  const nick = normalize(input.nickname);
  const fav = normalize(input.favoriteText);
  if (n) seeds.push(n);
  if (nick) seeds.push(nick);
  if (fav) seeds.push(fav);
  if (!seeds.length) seeds.push("hiphandle");
  return Array.from(new Set(seeds.map((s) => s.toLowerCase())));
}

/**
 * 규칙 체인을 적용하고, 실제로 변화가 일어난 규칙만 태그로 남긴다.
 */
function applyRuleChain(seed: string, rules: RuleId[], ctx: InputPayload) {
  let out = seed;
  const tags: string[] = [];
  for (const rid of rules) {
    const r = RuleMap[rid];
    const after = r.fn(out, ctx as any);
    const isCleanup = rid === "minimizeSymbols" || rid === "reduceConsonants";
    if (after && (after !== out || isCleanup)) {
      out = after;
      tags.push(r.tag);
    }
  }
  // 최종 안전 정규화 (플랫폼 공통 허용 문자로 제한)
  out = out.toLowerCase().replace(/[^a-z0-9._-]/g, "");
  return { handle: out, tags };
}

function pickN<T>(arr: T[], n: number) {
  if (n <= 0) return [];
  const s = shuffle(arr);
  return s.slice(0, Math.min(n, s.length));
}

/**
 * 🔧 핵심 변경점
 * - 선택한 규칙(selectedRules)만 사용해서 체인을 만든다.
 * - '특수문자 최소화/자음정리' 같은 정리 규칙은 사용자가 선택한 경우에만 포함한다.
 * - 선택 규칙이 비어 있으면 ["initialLetters","nickname"]을 기본값으로 사용한다.
 */
export function generateCandidates(
  input: InputPayload,
  count = DEFAULT_CANDIDATE_COUNT
): Candidate[] {
  const seeds = baseSeeds(input);

  const DEFAULT_SELECTED: RuleId[] = ["initialLetters", "nickname"];
  const cleanupAll: RuleId[] = ["minimizeSymbols", "reduceConsonants"];

  const selected: RuleId[] = (input.selectedRules?.length
    ? (input.selectedRules as RuleId[])
    : DEFAULT_SELECTED) as RuleId[];

  const selectedCleanup = selected.filter((r) => cleanupAll.includes(r));
  const anchors = selected.filter((r) => !cleanupAll.includes(r)); // 실제 변형 규칙

  // 힙 레벨 → 한 후보에 적용할 규칙 수 (최소 1, anchors 길이까지만)
  const perChainLen = Math.max(
    1,
    Math.min(
      anchors.length || 1,
      Math.round(1 + (input.hipLevel / 100) * Math.max(1, Math.min(3, anchors.length)))
    )
  );

  function makeChain(offset: number): RuleId[] {
    // 앵커가 없으면(사용자가 정리 규칙만 선택) 정리 규칙만 적용
    if (anchors.length === 0) {
      return shuffle([...selectedCleanup]) as RuleId[];
    }
    const anchor = anchors[offset % anchors.length];
    const others = anchors.filter((r) => r !== anchor);
    const spices = pickN(others, Math.max(0, perChainLen - 1));
    // 정리 규칙은 "선택된 경우에만" 포함
    return shuffle([anchor, ...spices, ...selectedCleanup] as RuleId[]);
  }

  const out: Candidate[] = [];
  let i = 0;
  let guard = 0;

  // 1) 선택 규칙 조합으로 채우기
  while (out.length < count && guard < 400) {
    const seed = seeds[i % seeds.length];
    const chain = makeChain(i);
    const res = applyRuleChain(seed, chain, input);
    if (res.handle && !out.some((c) => c.handle === res.handle)) {
      out.push(res);
    }
    i++;
    guard++;
  }

  // 2) 아직 모자라면 앵커 단일 적용 체인으로 보충 (역시 선택 규칙만)
  const fallbackVariants: RuleId[][] =
    anchors.length > 0
      ? anchors.map((a) => [a, ...selectedCleanup] as RuleId[])
      : [([...selectedCleanup] as RuleId[])];

  let f = 0;
  while (out.length < count && f < 100) {
    const base = seeds[out.length % seeds.length];
    const chain = shuffle(fallbackVariants)[0];
    const res = applyRuleChain(base, chain, input);
    if (res.handle && !out.some((c) => c.handle === res.handle)) {
      if (!res.tags.length) res.tags = ["변형"];
      out.push(res);
    }
    f++;
  }

  return out.slice(0, count);
}
