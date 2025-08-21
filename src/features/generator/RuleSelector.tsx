import Checkbox from "../../components/Checkbox/Checkbox";
import styles from "./RuleSelector.module.css";
import { RuleId } from "../../core/types";

const RULES: { id: RuleId; label: string }[] = [
  { id: "initialLetters", label: "앞글자 따오기" },
  { id: "leet", label: "알파벳→숫자 치환" },
  { id: "reverse", label: "거꾸로 쓰기" },
  { id: "nickname", label: "별명 기반 생성" },
  { id: "hangulQwerty", label: "한글→영문자판" },
  { id: "birthdayInsert", label: "생일 숫자 중간 삽입" },
  { id: "keyboardMash", label: "랜덤 키보드 매시업" },
  { id: "minimizeSymbols", label: "특수문자 최소화" },
  { id: "reduceConsonants", label: "x/z/q 남발 축소" },
];

type Props = {
  selected: RuleId[];
  onChange: (next: RuleId[]) => void;
};

export default function RuleSelector({ selected, onChange }: Props) {
  const toggle = (id: RuleId) => {
    const has = selected.includes(id);
    onChange(has ? selected.filter(r => r !== id) : [...selected, id]);
  };
  return (
    <div className={styles.grid}>
      {RULES.map(r => (
        <Checkbox key={r.id} label={r.label} checked={selected.includes(r.id)} onChange={()=>toggle(r.id)} />
      ))}
    </div>
  );
}
