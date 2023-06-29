import { MouseEventHandler, PropsWithChildren } from "react";
export type Props = {
  onClick?: MouseEventHandler;
};

export function Button({ onClick, children }: PropsWithChildren<Props>) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
