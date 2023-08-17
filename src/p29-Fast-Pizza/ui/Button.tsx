import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

type Props = {
  disabled?: boolean;
  to?: `/${string}`;
};
const className =
  "inline-block rounded-full bg-yellow-500 px-4 py-3 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";

export default function Button({
  children,
  disabled,
  to,
}: PropsWithChildren<Props>) {
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button disabled={disabled} className={className}>
      {children}
    </button>
  );
}
