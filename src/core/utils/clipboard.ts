export async function copyToClipboard(text: string) {//클립보드 api 사용
  try { await navigator.clipboard.writeText(text); return true; }
  catch { return false; }
}
