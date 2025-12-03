import { Html, Head, Main, NextScript } from 'next/document';
export default function Document() {
  return (
    <Html lang="es">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        {/* ...otros meta/link si hace falta... */}
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  );
}