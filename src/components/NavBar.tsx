import { useState } from 'react';
import {
  Box,
  Flex,
  Spacer,
  useColorMode,
  IconButton,
  Text,
  Link,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { API_ROUTES } from '@/constants';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Flex
        py={4}
        px={8}
        alignItems='center'
        justifyContent='space-between'
        gap={4}
      >
        <Link as={NextLink} href={API_ROUTES.home.path} passHref>
          <Text fontSize='2xl' fontWeight='bold'>
            {API_ROUTES.home.title}
          </Text>
        </Link>
        <Spacer />
        <Box display={{ base: 'none', md: 'block' }}>
          <Link as={NextLink} href={API_ROUTES.bookmarks.path} passHref>
            {API_ROUTES.bookmarks.title}
          </Link>
        </Box>
        <Box display={{ base: 'block', md: 'none' }}>
          <IconButton
            aria-label='Navigation Menu'
            title='Navigation Menu'
            icon={isMenuOpen ? <CloseIcon /> : <HamburgerIcon />}
            onClick={toggle}
          />
        </Box>
        <Box m='2'>
          <IconButton
            aria-label={`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } Theme`}
            title='Toggle Theme'
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
          />
        </Box>
      </Flex>
      {isMenuOpen && (
        <Box py={2} px={8} display={{ md: 'none' }}>
          <Link as={NextLink} href={API_ROUTES.bookmarks.path} passHref>
            {API_ROUTES.bookmarks.title}
          </Link>
        </Box>
      )}
    </>
  );
};

export default NavBar;
