const map: Record<string, string> = { a:"4", e:"3", i:"1", o:"0", s:"5", t:"7", b:"8", g:"9" };
export function leet(base: string) {
  return (base || "").replace(/[aeiostbg]/g, ch => map[ch] ?? ch);//aeiostbg 중 하나이면 함수 속 숫자로 변환
}//ch=처리 중인 현재 문자
