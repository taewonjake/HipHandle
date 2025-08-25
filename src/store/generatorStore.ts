import { create } from "zustand";//라이브러리 import
import { Candidate, InputPayload } from "../core/types";

type State = {
  input: InputPayload;
  candidates: Candidate[];
  setInput: (p: Partial<InputPayload>) => void;
  setCandidates: (c: Candidate[]) => void;
  reset: () => void;
};

export const useGeneratorStore = create<State>((set) => ({//create함수를 활용한 커스텀 hook
  input: { name: "", nickname: "", birthday: "", favoriteText: "", selectedRules: [], hipLevel: 50 },//사용자의 입력값 저장 객체
  candidates: [],//아이디 후보 전달하는 객체
  setInput: (p) => set((s) => ({ input: { ...s.input, ...p } })),//input상태 업데이트 하는 함수, input의 기존 값을 복사한 뒤, 새로 전달된 값 p를 덮어씌움
  setCandidates: (c) => set({ candidates: c }),//setCandidates**는 candidates 상태를 새로운 후보 목록으로 업데이트하는 함수
  reset: () => set({//상태 초기화 함수
    input: { name: "", nickname: "", birthday: "", favoriteText: "", selectedRules: [], hipLevel: 50 },
    candidates: []
  })
}));
