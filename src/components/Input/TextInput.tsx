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
      {label && <span className={styles.label}>{label}{requiredMark && " *"}</span>} {/*label이 있을 때만 보여주고, requiredMark가 true면 **문자 그대로 " *"**를 붙입니다*/}
      <input className={clsx(styles.input, className)} {...rest} /> {/*clsx(styles.input, className)로 내부 기본 클래스에 외부 className을 합친다*/}
    </label> //...rest로 표준 <input> 속성들을 그대로 전달
  );
}
