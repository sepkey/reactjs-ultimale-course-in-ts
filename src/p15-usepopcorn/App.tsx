import { useEffect, useState } from "react";
import "./index.css";
import { assertIsMovies } from "./getMovies";
import { MovieBrief, MovieWatched } from "./types";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Navbar } from "./Navbar";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { Main } from "./Main";
import { Box } from "./Box";
import { MovieDetails } from "./MovieDetails";
import { WatchedList } from "./WatchedList";
import { Summary } from "./Summary";
import { MoviesList } from "./MoviesList";

const API_KEY = "b45032a7";

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState<MovieBrief[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // const [watched, setWatched] = useState<MovieWatched[]>([]);

  const [watched, setWatched] = useState<MovieWatched[]>(function () {
    const storageValue = localStorage.getItem("watched")!;
    return JSON.parse(storageValue);
  });

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseDetaild() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: MovieWatched) {
    setWatched((movies) => [...movies, movie]);

    //we can store in the localStorage here, but for reusability => useEffect
    //another reason, with useEffect it simply watches the changes of watched, and if it will be deleted, we would had to write some code in handleDeleteWatched
    // localStorage.setItem("watched", JSON.stringify([...movies, movie]));
  }

  function handleDeleteWatched(id: string) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("watched", JSON.stringify(watched));
    },
    [watched]
  );

  useEffect(
    function () {
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

      handleCloseDetaild();
      getMovies(query);

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage msg={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              onAddWatched={handleAddWatched}
              onCloseDetails={handleCloseDetaild}
              selectedId={selectedId}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList watched={watched} onDelete={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
