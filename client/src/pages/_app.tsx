import '@/styles/globals.scss';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import type { AppProps } from 'next/app';

//_app.tsx: provides common layout and structure for pages. wraps all pages
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
