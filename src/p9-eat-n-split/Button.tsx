import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

export function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}
