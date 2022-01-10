import '../styles/global.css';
import 'tailwindcss/tailwind.css';
import 'react-loading-skeleton/dist/skeleton.css';

import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import { OffCanvasProvider } from '@listic/ui/off-canvas';
import { AuthProvider } from '@listic/react/auth/core';
import { IdProvider } from '@listic/ui/id';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

  return (
    <>
      <Head>
        <title>Listic</title>
      </Head>
      <AuthProvider>
        <IdProvider>
          <OffCanvasProvider>
            <Toaster />
            {getLayout(<Component {...pageProps} />)}
          </OffCanvasProvider>
        </IdProvider>
      </AuthProvider>
    </>
  );
}

export default ListicApp;
