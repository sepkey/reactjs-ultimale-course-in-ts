import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { MovieWatched } from "./types";

type LocalStorageStateHook<T> = [T, Dispatch<SetStateAction<T>>];

export function useLocalStorageState(
  initialState: MovieWatched[],
  key: string
): LocalStorageStateHook<MovieWatched[]> {
  const [value, setValue] = useState<MovieWatched[]>(function () {
    const storageValue = localStorage.getItem(key)!;
    return storageValue ? JSON.parse(storageValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );

  return [value, setValue];
}
