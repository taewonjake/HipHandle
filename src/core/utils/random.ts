export const sample = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]) => [...arr].sort(() => Math.random() - 0.5);
