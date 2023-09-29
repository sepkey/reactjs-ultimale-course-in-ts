import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Result<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorageState<T>(
  initialState: T,
  key: string,
): Result<T> {
  const [value, setValue] = useState<T>(function () {
    const storageValue = localStorage.getItem(key)!;
    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value],
  );

  return [value, setValue];
}
