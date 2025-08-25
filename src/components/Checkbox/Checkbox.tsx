import styles from "./Checkbox.module.css";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label: string };

export default function Checkbox({ label, ...rest }: Props) {
  return (
    <label className={styles.wrap}> {/*<label>로 감싸 레이블 클릭 시에도 체크 토글*/}
      <input type="checkbox" className={styles.input} {...rest} /> {/*<input>에는 고정 클래스(styles.input)를 적용하고, 나머지 속성은 전부 ...rest로*/}
      <span className={styles.label}>{label}</span>
    </label>
  );
}
