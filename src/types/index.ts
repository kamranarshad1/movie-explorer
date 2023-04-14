export type Movie = {
  imdbID: string;
  Year: string;
  Title: string;
  Type: string;
  Poster: string;
};

export type MovieRouteSuccessResponseData = Movie[];
export type MovieRouteErrorResponseData = { message: string };

export type Bookmarkable<T extends Movie> = T & {
  isBookmarked?: boolean;
  isWatched?: boolean;
};

export type BookmarkableMovie = Bookmarkable<Movie>;
