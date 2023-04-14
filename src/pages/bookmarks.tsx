import MovieCard from '@/components/MovieCard';
import { API_ROUTES } from '@/constants';
import useMovieBookmarks from '@/hooks/useMovieBookmarks';
import { Center, SimpleGrid, Text, Link } from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';

const Bookmarks = () => {
  const { movieBookmarks, addBookmark, removeBookmark, markAsWatched } =
    useMovieBookmarks();

  return (
    <>
      <Head>
        <title>Movie Explorer - Bookmarks</title>
        <meta name='description' content='Explore Bookmarked Movies' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {movieBookmarks?.length ? (
          <SimpleGrid columns={[1, 2, 3]} spacing='4'>
            {movieBookmarks.map((bookmarkedMovie) => (
              <MovieCard
                key={bookmarkedMovie.imdbID}
                movie={bookmarkedMovie}
                onBookmark={addBookmark}
                onRemoveBookmark={removeBookmark}
                onMarkWatched={markAsWatched}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Center>
            <Text size='lg'>
              No movies are bookmarked. Search for movie&nbsp;
              <Link
                as={NextLink}
                href={API_ROUTES.home.path}
                color='gray.300'
                passHref
              >
                here
              </Link>
              &nbsp;to bookmark.
            </Text>
          </Center>
        )}
      </main>
    </>
  );
};

export default Bookmarks;
