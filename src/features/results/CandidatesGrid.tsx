import styles from "./CandidatesGrid.module.css";
import CandidateCard from "./CandidateCard";
import { Candidate } from "../../core/types";

export default function CandidatesGrid({ items }: { items: Candidate[] }) {
  return (
    <section>
      <div className={styles.grid}>
        {items.map((c) => <CandidateCard key={c.handle} handle={c.handle} tags={c.tags} />)}
      </div>
    </section>
  );
}
