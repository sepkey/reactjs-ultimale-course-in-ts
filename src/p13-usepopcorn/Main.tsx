import { PropsWithChildren } from "react";

export function Main({ children }: PropsWithChildren) {
  return <main className="main">{children}</main>;
}
