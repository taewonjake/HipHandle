export function minimizeSymbols(base: string) {
  return (base || "").replace(/[_.-]+/g, "").replace(/\s+/g, "");//문자열에서 특수기호 모두 제거
}
