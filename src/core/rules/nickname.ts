export function applyNickname(base: string, nickname?: string) {
  const n = (nickname || "").toLowerCase().replace(/\s+/g, "");//소문자로 변환, 공백 제거
  if (!n) return base;
  return n.length % 2 === 0 ? n + base : base + n;//짝수: 닉네임+base, 홀수: base+닉네임
}
