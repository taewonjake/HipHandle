export function minimizeSymbols(base: string) {
  return (base || "").replace(/[_.-]+/g, "").replace(/\s+/g, "");
}
