import { MovieBrief } from "./types";

export type Props = {
  movie: MovieBrief;
  onSelectMovie: (id: string) => void;
};
export function Movie({ movie, onSelectMovie }: Props) {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
