export const normalize = (s?: string) => (s || "").trim();

export const onlyAscii = (s: string) => s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '');

export const removeSymbols = (s: string) => s.replace(/[\s_.-]+/g, "");

export const compactRepeats = (s: string) => s.replace(/([a-zA-Z])\1{2,}/g, "$1$1");
