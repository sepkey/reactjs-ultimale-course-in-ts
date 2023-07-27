import { MouseEventHandler, PropsWithChildren } from "react";
import styles from "./Button.module.css";

type Props = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type: "back" | "primary" | "position";
};
export default function Button({
  onClick,
  type,
  children,
}: PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
