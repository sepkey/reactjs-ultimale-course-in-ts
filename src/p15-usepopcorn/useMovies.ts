import { useEffect, useState } from "react";
import { MovieBrief } from "./types";
import { assertIsMovies } from "./getMovies";

const API_KEY = "b45032a7";

export function useMovies(query: string) {
  const [movies, setMovies] = useState<MovieBrief[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      // callback?.();
      const controller = new AbortController();

      async function getMovies(query: string) {
        try {
          setIsloading(true);
          setError("");
          const response = await fetch(
            `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!response.ok)
            throw new Error("Something went wrong whith fetching movies!");
          const data = await response.json();
          if (data.Response === "False") throw new Error("Movie not found!");
          const body = data.Search as unknown;
          assertIsMovies(body);

          setMovies(body);
          setError("");
        } catch (err: any) {
          if (err.name !== "AbortError") {
            console.log(err);
            setError(err.message);
          }
        } finally {
          setIsloading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseDetaild();
      getMovies(query);

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
