import styles from "./RerollBar.module.css";
import Button from "../../components/Button/Button";
import { useGeneratorStore } from "../../store/generatorStore";
import { generateCandidates } from "../../core/generator";

export default function RerollBar(){
  const { input, setCandidates } = useGeneratorStore();
  const reroll = () => {//누르면 함수 다시 실행
    const res = generateCandidates(input);
    setCandidates(res);
  };
  return (
    <div className={styles.bar}>
      <Button onClick={reroll} className={styles.btn}>다시 생성하기</Button>
    </div>
  );
}
