import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import trpc from '@/lib/hooks/trpc';
import type { AppRouter } from '@/server/trpc/routers/_app';

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default trpc.withTRPC(App);
