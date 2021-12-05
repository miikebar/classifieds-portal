import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import 'tailwindcss/tailwind.css';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}

export default ListicApp;
