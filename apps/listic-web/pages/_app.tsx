import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

function ListicApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default ListicApp;
