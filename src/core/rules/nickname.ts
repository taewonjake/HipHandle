export function applyNickname(base: string, nickname?: string) {
  const n = (nickname || "").toLowerCase().replace(/\s+/g, "");
  if (!n) return base;
  // prepend or append depending on length
  return n.length % 2 === 0 ? n + base : base + n;
}
