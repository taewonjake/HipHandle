export function initialLetters(sentence: string) {
  const src = (sentence || "").toLowerCase().replace(/[^a-z0-9\s]/g, "");//전부 소문자로 변환, 정규표현식으로 **알파벳(a-z), 숫자(0-9), 공백(\s)**만 남기고 나머지는 제거.
  const parts = src.trim().split(/\s+/).filter(Boolean);//배열 중 단어만 남김
  const initials = parts.map(p => p[0]).join("");//각 단어 p에서 첫 글자만 뽑음. 배열을 다시 문자열로 합침.
  return initials || "";
}
