export type MovieType = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
};

export type SelectedMovie = {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbID: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
};
