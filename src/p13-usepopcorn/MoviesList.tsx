import { Movie } from "./Movie";
import { MovieBrief } from "./types";

export type Props = {
  movies: MovieBrief[];
  onSelectMovie: (id: string) => void;
};
export function MoviesList({ movies, onSelectMovie }: Props) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie key={movie.imdbID} movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
