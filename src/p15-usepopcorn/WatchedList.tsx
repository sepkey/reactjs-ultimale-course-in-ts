import { WatchedMovie } from "./WatchedMovie";
import { MovieWatched } from "./types";

export type Props = {
  watched: MovieWatched[];
  onDelete: (id: string) => void;
};
export function WatchedList({ watched, onDelete }: Props) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDelete={onDelete} />
      ))}
    </ul>
  );
}
