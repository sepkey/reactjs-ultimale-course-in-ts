import { useEffect, useRef } from "react";

export type Props = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};
export function Search({ query, setQuery }: Props) {
  //how not to select Dom element
  //if we have to add a dpendenccy array, it would select the element over and over again
  // useEffect(function () {
  //   const el = document.querySelector(".search") as HTMLInputElement;
  //   el.focus();
  // }, []);

  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(function () {
    inputEl.current?.focus();
  }, []);

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current?.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      ref={inputEl}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
