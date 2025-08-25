// Simple Korean keyboard mapping (Dubeolsik)
const map: Record<string, string> = {
  "ㅂ":"q","ㅈ":"w","ㄷ":"e","ㄱ":"r","ㅅ":"t","ㅛ":"y","ㅕ":"u","ㅑ":"i","ㅐ":"o","ㅔ":"p",
  "ㅁ":"a","ㄴ":"s","ㅇ":"d","ㄹ":"f","ㅎ":"g","ㅗ":"h","ㅓ":"j","ㅏ":"k","ㅣ":"l",
  "ㅋ":"z","ㅌ":"x","ㅊ":"c","ㅍ":"v","ㅠ":"b","ㅜ":"n","ㅡ":"m" //한글을 키보드 그대로 쳤을 때 영어들
};
export function hangulQwerty(nameOrKorean: string) {
  const s = (nameOrKorean || "").trim();
  if (!s) return "";
  return Array.from(s).map(ch => map[ch] ?? ch).join("");//각 글자를 map의 규칙에 따라 반환하고 합침
}
