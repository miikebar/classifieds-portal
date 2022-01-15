import '../styles/global.css';
import 'tailwindcss/tailwind.css';
import 'react-loading-skeleton/dist/skeleton.css';

import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import { OffCanvasProvider } from '@listic/ui/off-canvas';
import { AuthProvider } from '@listic/react/auth/core';
import { IdProvider } from '@listic/ui/id';
import { Toaster } from 'react-hot-toast';
import { DefaultSeo } from 'next-seo';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

  return (
    <>
      <DefaultSeo
        titleTemplate="Listic | %s"
        defaultTitle="Listic — Portal z ogłoszeniami lokalnymi"
        description="Na Listic znajdziesz ogłoszenia sprzedaży z szerokiej gamy kategorii. Przeglądaj, szukaj, rozmawiaj i kupuj - wszystko czego potrzebujesz jest w zasięgu Twojej ręki!"
      />
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
