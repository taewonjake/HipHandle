import styles from "./Checkbox.module.css";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

export default function Checkbox({ label, ...rest }: Props) {
  return (
    <label className={styles.wrap}>
      <input type="checkbox" className={styles.input} {...rest} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}
