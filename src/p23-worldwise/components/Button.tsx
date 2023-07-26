import { PropsWithChildren } from "react";
import styles from "./Button.module.css";

type Props = {
  onClick?: () => void;
  type: "back" | "primary" | "position";
};
export default function Button({
  onClick,
  type,
  children,
}: PropsWithChildren<Props>) {
  return (
    <div onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </div>
  );
}
