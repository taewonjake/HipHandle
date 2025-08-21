import styles from "./TextInput.module.css";
import clsx from "classnames";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  requiredMark?: boolean;
};

export default function TextInput({ label, requiredMark, className, ...rest }: Props) {
  return (
    <label className={styles.wrap}>
      {label && <span className={styles.label}>{label}{requiredMark && " *"}</span>}
      <input className={clsx(styles.input, className)} {...rest} />
    </label>
  );
}
