import styles from "./Button.module.css";
import clsx from "classnames";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
};

export default function Button({ variant="primary", className, ...rest }: Props) {
  return <button className={clsx(styles.btn, styles[variant], className)} {...rest} />;
}
