import styles from "./CandidateCard.module.css";
import Button from "../../components/Button/Button";
import Tag from "../../components/Tag/Tag";
import { useClipboard } from "../../hooks/useClipboard";

type Props = { handle: string; tags: string[] };

export default function CandidateCard({ handle, tags }: Props) {
  const { copy } = useClipboard();
  const doCopy = async () => {
    const ok = await copy(handle);
    if (ok) alert("복사되었습니다!");
  };
  return (
    <div className={styles.card}>
      <button className={styles.iconCopy} onClick={doCopy} aria-label="핸들 복사">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M8 8h9a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" fill="currentColor"/>
          <path d="M6 6h9a1 1 0 0 1 1 1v1H8a3 3 0 0 0-3 3v8H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2z" fill="currentColor" opacity=".5"/>
        </svg>
      </button>
      <div className={styles.handle}>@{handle || ""}</div>
      <div className={styles.tags}>{tags.map(t => <Tag key={t} label={t} />)}</div>
      <Button variant="outline" className={styles.copy} onClick={doCopy}>
        복사하기
      </Button>
    </div>
  );
}
