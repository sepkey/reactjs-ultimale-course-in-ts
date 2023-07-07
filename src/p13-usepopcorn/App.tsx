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

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState<MovieBrief[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useState<MovieWatched[]>([]);

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

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseDetaild() {
    setSelectedId(null);
  }

  function handleAddWatched(movie: MovieWatched) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((movies) => movies.filter((movie) => movie.imdbID !== id));
  }
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

///////alternative for useEffect, adding handler:
///clean one but without abort
// useEffect(() => {
//   let cancel = false;
//   if (query.length < 3) {
//     setMovies([]);
//     setError("");
//     return;
//   }

//   setIsloading(true);
//   setError("");
//   getMovies(query)
//     .then((data) => {
//       if (!cancel) {
//         setMovies(data);
//       }
//     })
//     .catch((err) => setError(err.message))
//     .finally(() => setIsloading(false));

//   return () => {
//     cancel = true;
//   };
// }, [query]);

//alternative for useEffect
// function handleSearchFocus() {
//   const controller = new AbortController();

//   async function getMovies(query: string) {
//     try {
//       setIsloading(true);
//       setError("");
//       const response = await fetch(
//         `http://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
//         { signal: controller.signal }
//       );

//       if (!response.ok)
//         throw new Error("Something went wrong whith fetching movies!");
//       const data = await response.json();
//       if (data.Response === "False") throw new Error("Movie not found!");
//       const body = data.Search as unknown;
//       assertIsMovies(body);

//       setMovies(body);
//       setError("");
//     } catch (err: any) {
//       if (err.name !== "AbortError") {
//         console.log(err);
//         setError(err.message);
//       }
//     } finally {
//       setIsloading(false);
//     }
//   }

//   if (query.length < 3) {
//     setMovies([]);
//     setError("");
//     return;
//   }

//   handleCloseDetaild();
//   getMovies(query);
// }
