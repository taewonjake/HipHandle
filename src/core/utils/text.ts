export const normalize = (s?: string) => (s || "").trim();//문자열이 없을 때 안전하게 빈 문자열 반환 + 앞뒤 공백 제거.

export const onlyAscii = (s: string) => s.normalize('NFKD').replace(/[^\x00-\x7F]/g, '');//문자열에서 영문, 숫자, 기본 기호만 남기고, 한글/특수기호/악센트 등은 제거.

export const removeSymbols = (s: string) => s.replace(/[\s_.-]+/g, "");//문자열에서 공백·밑줄·점·하이픈 제거.

export const compactRepeats = (s: string) => s.replace(/([a-zA-Z])\1{2,}/g, "$1$1");//알파벳이 3번 이상 반복되면, 2번까지만 유지.
