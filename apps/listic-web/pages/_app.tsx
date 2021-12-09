import '../styles/global.css';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import { OffCanvasProvider } from '@listic/ui/off-canvas';
import { AuthProvider } from '@listic/core/auth';
import { IdProvider } from '@listic/ui/id';
import { Toaster } from 'react-hot-toast';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

  return (
    <AuthProvider>
      <IdProvider>
        <OffCanvasProvider>
          <Toaster />
          {getLayout(<Component {...pageProps} />)}
        </OffCanvasProvider>
      </IdProvider>
    </AuthProvider>
  );
}

export default ListicApp;
