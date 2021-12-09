import '../styles/global.css';
import 'tailwindcss/tailwind.css';

import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import { OffCanvasProvider } from '@listic/ui/off-canvas';
import { AuthProvider } from '@listic/core/auth';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

  return (
    <AuthProvider>
      <OffCanvasProvider>
        {getLayout(<Component {...pageProps} />)}
      </OffCanvasProvider>
    </AuthProvider>
  );
}

export default ListicApp;
