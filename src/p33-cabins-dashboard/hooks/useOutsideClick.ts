import { useEffect, useRef } from "react";

export default function useOutsideClick(
  closeFn: () => void,
  listenCapturing: boolean = true,
) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          closeFn();
        }
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [closeFn, listenCapturing],
  );

  return ref;
}
