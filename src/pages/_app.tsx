import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { Movie } from '@/types';
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
