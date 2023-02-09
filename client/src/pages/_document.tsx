import { Html, Head, Main, NextScript } from 'next/document'

//_document.tsx: sets structure of html documents that gets sent to browser. this file is rendered on server
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
