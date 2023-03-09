import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { AuthProvider } from '../context/AuthContext';
import { DarkModeProvider } from '../context/DarkModeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

//_app.tsx: provides common layout and structure for pages. wraps all pages
export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </DarkModeProvider>
      </QueryClientProvider>
    </>
  );
}
