import { create } from "zustand";
import { Candidate, InputPayload } from "../core/types";

type State = {
  input: InputPayload;
  candidates: Candidate[];
  setInput: (p: Partial<InputPayload>) => void;
  setCandidates: (c: Candidate[]) => void;
  reset: () => void;
};

export const useGeneratorStore = create<State>((set) => ({
  input: { name: "", nickname: "", birthday: "", favoriteText: "", selectedRules: [], hipLevel: 50 },
  candidates: [],
  setInput: (p) => set((s) => ({ input: { ...s.input, ...p } })),
  setCandidates: (c) => set({ candidates: c }),
  reset: () => set({
    input: { name: "", nickname: "", birthday: "", favoriteText: "", selectedRules: [], hipLevel: 50 },
    candidates: []
  })
}));
