import type { ReactElement } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';

import NavBar from './NavBar';

const Layout = ({ children }: { children: ReactElement }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const color = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bg} color={color} minH='100vh' maxWidth={1100} m='auto'>
      <NavBar />
      <Box p={8}>{children}</Box>
    </Box>
  );
};

export default Layout;
