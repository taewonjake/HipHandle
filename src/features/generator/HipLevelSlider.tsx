import styles from "./HipLevelSlider.module.css";
import React from "react";

type Props = { value: number; onChange: (v:number)=>void; };

export default function HipLevelSlider({ value, onChange }: Props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        <span>보수적</span>
        <span className={styles.percent}>{value}%</span>
        <span>과감</span>
      </div>
      <input
        type="range" min={0} max={100} value={value}
        onChange={(e)=> onChange(Number(e.target.value))}
        className={styles.slider}
      />
    </div>
  );
}
