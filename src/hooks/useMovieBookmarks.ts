import type { BookmarkableMovie } from '@/types';
import { useState, useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const KEY = 'bookmarks';

const successToast = (toast: ReturnType<typeof useToast>, title: string) =>
  toast({
    title,
    status: 'success',
    duration: 3000,
    isClosable: true,
  });

const errorToast = (toast: ReturnType<typeof useToast>, title: string) =>
  toast({
    title,
    status: 'error',
    duration: 2000,
    isClosable: true,
  });

const useMovieBookmarks = () => {
  const [movieBookmarks, setMovieBookmarks] = useState<BookmarkableMovie[]>([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  useEffect(() => {
    try {
      const localBookmarks = JSON.parse(
        localStorage.getItem(KEY) || '[]'
      ) as BookmarkableMovie[];

      setMovieBookmarks(localBookmarks);
      setLoading(false);
    } catch (error) {
      errorToast(toast, 'Unable to load saved bookmarks.');
    }
  }, [toast]);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem(KEY, JSON.stringify(movieBookmarks));
    }
  }, [loading, movieBookmarks]);

  const addBookmark = (movie: BookmarkableMovie) => {
    setMovieBookmarks((prevBookmarks) => [
      ...prevBookmarks,
      { ...movie, isBookmarked: true, isWatched: false },
    ]);

    successToast(toast, `${movie.Title} has been bookmarked!`);
  };

  const removeBookmark = (movie: BookmarkableMovie) => {
    setMovieBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.imdbID !== movie.imdbID)
    );

    successToast(toast, `${movie.Title} has been removed from bookmarks!`);
  };

  const markAsWatched = (movie: BookmarkableMovie) => {
    setMovieBookmarks((prevBookmarks) =>
      prevBookmarks.map((bookmark) =>
        bookmark.imdbID === movie.imdbID
          ? { ...bookmark, isWatched: true }
          : bookmark
      )
    );

    successToast(toast, `${movie.Title} has been watched!`);
  };

  return {
    movieBookmarks,
    addBookmark,
    removeBookmark,
    markAsWatched,
  };
};

export default useMovieBookmarks;
