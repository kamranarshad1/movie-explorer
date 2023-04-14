import useMoviesSearch from '@/hooks/useMoviesSearch';
import { Box, Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import Head from 'next/head';

export default function Home() {
  const { error, isLoading, movies } = useMoviesSearch('Avengers Endgame');

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

    return <pre>{JSON.stringify(movies, null, 2)}</pre>;
  };

  return (
    <>
      <Head>
        <title>Movie Explorer</title>
        <meta name='description' content='Explore movies' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>{renderMovies()}</main>
    </>
  );
}
