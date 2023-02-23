import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { DarkModeProvider } from '../context/DarkModeContext';

//_app.tsx: provides common layout and structure for pages. wraps all pages
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DarkModeProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </DarkModeProvider>
    </>
  );
}
