import { PropsWithChildren } from "react";
import { Logo } from "./Logo";

export function Navbar({ children }: PropsWithChildren) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
