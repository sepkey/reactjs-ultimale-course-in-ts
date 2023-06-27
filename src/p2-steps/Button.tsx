import { MouseEventHandler, PropsWithChildren } from "react";

type Props = {
  txtColor: string;
  bgColor: string;
  onClick: MouseEventHandler;
};

export function Button({
  children,
  bgColor,
  txtColor,
  onClick,
}: PropsWithChildren<Props>) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: txtColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
