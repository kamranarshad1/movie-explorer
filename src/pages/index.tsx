import MovieCard from '@/components/MovieCard';
import useMovieBookmarks from '@/hooks/useMovieBookmarks';
import useMoviesSearch from '@/hooks/useMoviesSearch';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  IconButton,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';

const LAST_SEARCH_KEY = 'search';

export default function Home() {
  const [search, setSearch] = useState('');
  const { error, isLoading, movies } = useMoviesSearch(search);
  const { movieBookmarks, addBookmark, removeBookmark, markAsWatched } =
    useMovieBookmarks();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (search) sessionStorage.setItem(LAST_SEARCH_KEY, search);
  }, [search]);

  useEffect(() => {
    const previousSearch =
      (sessionStorage.getItem(LAST_SEARCH_KEY) as string) || '';

    setSearch(previousSearch);
    if (inputRef.current) {
      inputRef.current.value = previousSearch;
    }
  }, []);

  const renderSearch = () => (
    <Box mb={10}>
      <Flex alignItems='center' as='form' onSubmit={(e) => e.preventDefault()}>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch(inputRef.current?.value || search);
            }
          }}
          placeholder='Enter a movie title'
          mr={3}
          ref={inputRef}
          size='lg'
        />
        <IconButton
          aria-label='Search'
          title='Search'
          size='lg'
          icon={<SearchIcon />}
          onClick={() => setSearch(inputRef.current?.value || search)}
        />
      </Flex>
    </Box>
  );

  const renderMovies = () => {
    if (isLoading) {
      return (
        <Center>
          <Spinner size='xl' />
        </Center>
      );
    }

    if (error) {
      return (
        <Box mt={8}>
          <Center>
            <Text fontSize='xl' fontWeight='bold' color='red.500'>
              {error?.message ||
                'Error searching for movies. Please try again.'}
            </Text>
          </Center>
        </Box>
      );
    }

    return movies?.length ? (
      <SimpleGrid columns={[1, 2, 3]} spacing='4'>
        {movies.map((movie) => {
          const bookmarkedMovie = movieBookmarks.find(
            (m) => m.imdbID === movie.imdbID
          );

          return (
            <MovieCard
              key={movie.imdbID}
              movie={{
                ...movie,
                isBookmarked: !!bookmarkedMovie,
                isWatched: bookmarkedMovie?.isWatched,
              }}
              onBookmark={addBookmark}
              onRemoveBookmark={removeBookmark}
              onMarkWatched={markAsWatched}
            />
          );
        })}
      </SimpleGrid>
    ) : (
      <Center>
        <Text size='lg'>Search for movies...</Text>
      </Center>
    );
  };

  return (
    <>
      <Head>
        <title>Movie Explorer</title>
        <meta name='description' content='Explore movies' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {renderSearch()}
        {renderMovies()}
      </main>
    </>
  );
}
