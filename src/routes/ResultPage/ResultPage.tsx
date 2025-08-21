import Topbar from "../../components/Topbar/Topbar";
import styles from "./ResultPage.module.css";
import CandidatesGrid from "../../features/results/CandidatesGrid";
import Button from "../../components/Button/Button";
import { useGeneratorStore } from "../../store/generatorStore";
import { generateCandidates } from "../../core/generator";

export default function ResultPage(){
  const { input, candidates, setCandidates } = useGeneratorStore();
  const reroll = () => {
    const res = generateCandidates(input);
    setCandidates(res);
  };
  return (
    <>
      <Topbar />
      <main className={styles.wrap}>
        <header className={styles.hero}>
          <h1 className={styles.title}>생성 완료! 🎉</h1>
          <Button onClick={reroll} className={styles.heroBtn}>다시 생성하기</Button>
        </header>
        <CandidatesGrid items={candidates} />
      </main>
    </>
  );
}
