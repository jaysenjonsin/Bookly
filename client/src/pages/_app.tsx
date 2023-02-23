import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { DarkModeProvider } from '../context/darkModeContext';

//_app.tsx: provides common layout and structure for pages. wraps all pages
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeProvider>
        <Component {...pageProps} />
      </DarkModeProvider>
    </>
  );
}
