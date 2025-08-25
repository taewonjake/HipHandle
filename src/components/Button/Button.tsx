import styles from "./Button.module.css";
import clsx from "classnames";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost"; //variant라는 선택적 커스텀 프롭을 추가. 값은 "primary" | "outline" | "ghost"만 가능
};

export default function Button({ variant="primary", className, ...rest }: Props) { //variant="primary"로 기본값 지정
  return <button className={clsx(styles.btn, styles[variant], className)} {...rest} />; 
} //styles.btn: 모든 버튼에 공통 적용되는 기본 클래스. styles[variant]: variant 값에 따라 동적으로 .primary/.outline/.ghost 중 하나를 적용.
