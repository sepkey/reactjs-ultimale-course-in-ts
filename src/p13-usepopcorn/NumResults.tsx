import { MovieBrief } from "./types";

export function NumResults({ movies }: { movies: MovieBrief[] }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
