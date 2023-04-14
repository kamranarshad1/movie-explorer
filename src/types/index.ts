export type Movie = {
  imdbID: string;
  Year: string;
  Title: string;
  Poster: string;
};

export type MovieRouteSuccessResponseData = Movie[];
export type MovieRouteErrorResponseData = { message: string };
