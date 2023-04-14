import MovieCard from '@/components/MovieCard';
import useMoviesSearch from '@/hooks/useMoviesSearch';
import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  SimpleGrid,
  Spinner,
  Text,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRef, useState } from 'react';

export default function Home() {
  const [search, setSearch] = useState('');
  const { error, isLoading, movies } = useMoviesSearch(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const renderSearch = () => (
    <Box mb={10}>
      <Flex alignItems='center' as='form' onSubmit={(e) => e.preventDefault()}>
        <Input
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSearch(inputRef.current?.value || '');
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
          onClick={() => setSearch(inputRef.current?.value || '')}
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
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onBookmark={() => {}}
            onRemoveBookmark={() => {}}
          />
        ))}
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
