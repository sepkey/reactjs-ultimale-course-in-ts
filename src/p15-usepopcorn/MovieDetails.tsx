import { useEffect, useRef, useState } from "react";
import { MovieDetail, MovieWatched } from "./types";
import { getMovieDetails } from "./getMovieDetails";
import StarRating from "./StarRating";
import { Loader } from "./Loader";
type Props = {
  selectedId: string | null;
  onCloseDetails: () => void;
  onAddWatched: (movie: MovieWatched) => void;
  watched: MovieWatched[];
};

export function MovieDetails({
  selectedId,
  onCloseDetails,
  onAddWatched,
  watched,
}: Props) {
  const [movie, setMovie] = useState<Partial<MovieDetail>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) {
        countRef.current += 1;
      }
    },
    [userRating]
  );

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
      counteRating: countRef.current,
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
