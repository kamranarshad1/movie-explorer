import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  Image,
  Link,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { ExternalLinkIcon, StarIcon } from '@chakra-ui/icons';
import type { BookmarkableMovie } from '@/types';

type Props = {
  movie: BookmarkableMovie;
  onBookmark: (movie: BookmarkableMovie) => void;
  onRemoveBookmark: (movie: BookmarkableMovie) => void;
};

const fallbackImageSrc =
  'https://www.seekpng.com/png/detail/20-201439_play-movie-comments-png-play-movie-icon.png';

const MovieCard = ({ movie, onBookmark, onRemoveBookmark }: Props) => {
  const { Title, Year, Type, Poster, imdbID, isBookmarked } = movie;

  return (
    <Card borderRadius='lg' justifyContent='spce-between'>
      <CardHeader>
        <Image
          src={Poster}
          fallbackSrc={fallbackImageSrc}
          alt={Title}
          borderRadius='lg'
          fit='fill'
          backgroundSize='contain'
        />
      </CardHeader>
      <CardBody display='flex' alignItems='flex-end'>
        <Box mb='2'>
          <Heading as='h4' size='md' fontWeight='bold'>
            {Title}
          </Heading>
          <Text fontSize='sm' color='gray.600'>
            {Year} - {Type}
          </Text>
        </Box>
      </CardBody>
      <CardFooter justify='space-between'>
        <Tooltip label='IMDb Page'>
          <Link href={`https://www.imdb.com/title/${imdbID}`} isExternal>
            <IconButton
              icon={<ExternalLinkIcon />}
              aria-label='IMDb Page'
              size='sm'
              variant='ghost'
              colorScheme='gray'
            />
          </Link>
        </Tooltip>

        <Tooltip label={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}>
          <IconButton
            icon={<StarIcon />}
            aria-label={isBookmarked ? 'Remove Bookmark' : 'Bookmark'}
            size='sm'
            variant={isBookmarked ? 'solid' : 'ghost'}
            colorScheme={isBookmarked ? 'yellow' : 'gray'}
            onClick={() =>
              isBookmarked ? onBookmark(movie) : onRemoveBookmark(movie)
            }
          />
        </Tooltip>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
