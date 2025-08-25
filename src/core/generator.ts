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
  const fav = normalize(input.favoriteText);//공백 제거한 뒤
  if (n) seeds.push(n);
  if (nick) seeds.push(nick);
  if (fav) seeds.push(fav);
  if (!seeds.length) seeds.push("hiphandle");//없으면 그냥 넣음
  return Array.from(new Set(seeds.map((s) => s.toLowerCase())));//seed에 넣기
}

/**
 * 규칙 체인을 적용하고, 실제로 변화가 일어난 규칙만 태그로 남긴다.
 */
function applyRuleChain(seed: string, rules: RuleId[], ctx: InputPayload) {
  let out = seed;
  const tags: string[] = [];
  for (const rid of rules) {
    const r = RuleMap[rid];//반복하여 규칙을 찾음
    const after = r.fn(out, ctx as any);//규칙의 함수 호출
    const isCleanup = rid === "minimizeSymbols" || rid === "reduceConsonants";//이 두 규칙은 정리규칙으로 간주
    if (after && (after !== out || isCleanup)) {//변형이 일어난 경우
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


export function generateCandidates(
  input: InputPayload,
  count = DEFAULT_CANDIDATE_COUNT
): Candidate[] {
  const seeds = baseSeeds(input);

  const DEFAULT_SELECTED: RuleId[] = ["initialLetters", "nickname"];//기본 선택 규칙
  const cleanupAll: RuleId[] = ["minimizeSymbols", "reduceConsonants"];//정리규칙 목록

  const selected: RuleId[] = (input.selectedRules?.length
    ? (input.selectedRules as RuleId[])
    : DEFAULT_SELECTED) as RuleId[];

  const selectedCleanup = selected.filter((r) => cleanupAll.includes(r));//선택 규칙들 중 정리규칙만
  const anchors = selected.filter((r) => !cleanupAll.includes(r)); // 실제 변형 규칙

  // 힙 레벨 → 한 후보에 적용할 규칙 수 (최소 1, anchors 길이까지만)
  const perChainLen = Math.max(
    1,
    Math.min(
      anchors.length || 1,
      Math.round(1 + (input.hipLevel / 100) * Math.max(1, Math.min(3, anchors.length)))//힙려벨이 높을수록 변형 규칙 수 증가
    )
  );

  function makeChain(offset: number): RuleId[] {
    // 변형규칙이 없으면(사용자가 정리 규칙만 선택) 사용자가 선택한 정리 규칙만 적용
    if (anchors.length === 0) {
      return shuffle([...selectedCleanup]) as RuleId[];
    }
    const anchor = anchors[offset % anchors.length];
    const others = anchors.filter((r) => r !== anchor);
    const spices = pickN(others, Math.max(0, perChainLen - 1));//perChainLen개를 pickN에서 랜덤추출
    // 정리 규칙은 "선택된 경우에만" 포함
    return shuffle([anchor, ...spices, ...selectedCleanup] as RuleId[]);//랜덤으로 섞기
  }

  const out: Candidate[] = [];
  let i = 0;
  let guard = 0;

  // 1) 선택 규칙 조합으로 채우기
  while (out.length < count && guard < 400) {//400회 한도로, seeds를 순환하며 makeChain(i)로 체인을 만들고 applyRuleChain.
    const seed = seeds[i % seeds.length];
    const chain = makeChain(i);
    const res = applyRuleChain(seed, chain, input);
    if (res.handle && !out.some((c) => c.handle === res.handle)) {//결과 핸들이 비어있지 않고 기존과 중복이 아니면 out에 추가.
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
  while (out.length < count && f < 100) {//앵커가 전혀 없으면 selectedCleanup만 적용
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

/*예시
입력: { name: "Jake", nickname: "Jay", favoriteText: "", hipLevel: 60, selectedRules: ["leet","keyboardMash","minimizeSymbols"] }
seeds → ["jake","jay"]
anchors → ["leet","keyboardMash"], selectedCleanup → ["minimizeSymbols"]
perChainLen ≈ 2 (힙레벨 60이므로 앵커 2개 중 1~2개 적용)
체인 예: ["keyboardMash","leet","minimizeSymbols"] (랜덤 섞임)
각 씨앗에 체인 적용 → 허용 문자만 남기고 소문자화 → 중복 제거 후 후보 채우기 */