import { useState } from "react";
import "./index.css";
import { MovieWatched } from "./types";
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
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorage";

export const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

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
