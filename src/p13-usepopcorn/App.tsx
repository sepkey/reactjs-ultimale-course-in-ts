import { useEffect, useState } from "react";
import "./index.css";
import { assertIsMovies } from "./getMovies";
import { MovieBrief, MovieDetail, MovieWatched } from "./types";
import { getMovieDetails } from "./getMovieDetails";
import StarRating from "./StarRating";
import { Search } from "./Search";
import { NumResults } from "./NumResults";
import { Navbar } from "./Navbar";
import { ErrorMessage } from "./ErrorMessage";
import { Loader } from "./Loader";
import { Main } from "./Main";
import { Box } from "./Box";
import { Movie } from "./Movie";

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

const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [movies, setMovies] = useState<MovieBrief[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [watched, setWatched] = useState<MovieWatched[]>([]);

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

type ListProps = {
  movies: MovieBrief[];
  onSelectMovie: (id: string) => void;
};

function MoviesList({ movies, onSelectMovie }: ListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

type SummaryProps = {
  watched: MovieWatched[];
};

function Summary({ watched }: SummaryProps) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

type WatchedListProps = {
  watched: MovieWatched[];
  onDelete: (id: string) => void;
};
function WatchedList({ watched, onDelete }: WatchedListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}

type WatchedMovieProps = {
  movie: MovieWatched;
  onDelete: (id: string) => void;
};
function WatchedMovie({ movie, onDelete }: WatchedMovieProps) {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(movie.imdbID)}>
        ❌
      </button>
    </li>
  );
}

type MovieDetailsProps = {
  selectedId: string | null;
  onCloseDetails: () => void;
  onAddWatched: (movie: MovieWatched) => void;
  watched: MovieWatched[];
};

function MovieDetails({
  selectedId,
  onCloseDetails,
  onAddWatched,
  watched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState<Partial<MovieDetail>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const iswatched = watched.map((movie) => movie.imdbID).includes(selectedId!);
  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const {
    Poster: poster,
    Title: title,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Actors: actors,
    Director: director,
    Genre: genre,
    Plot: plot,
    Released: released,
  } = movie;

  useEffect(() => {
    let cancel = false;
    setIsLoading(true);
    getMovieDetails(selectedId!)
      .then((data) => {
        if (!cancel) {
          setMovie(data);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      cancel = true;
    };
  }, [selectedId]);

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie ${title}`;

      return function () {
        document.title = "usePopcorn";
        // console.log("Clean up Effect for:", title);
      };
    },
    [title]
  );

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (e.code === "Escape") {
          onCloseDetails();
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [onCloseDetails]
  );

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId!,
      Poster: poster!,
      Title: title!,
      imdbRating: Number(imdbRating!),
      runtime: Number(runtime?.split(" ")[0]),
      Year: year!,
      userRating: userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseDetails();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseDetails}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}{" "}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} imdb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {iswatched ? (
                <p>
                  You rted this movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              ) : (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to list
                    </button>
                  )}
                </>
              )}
            </div>

            <p>
              <em> {plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
