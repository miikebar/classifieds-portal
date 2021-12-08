import type { AppProps } from 'next/app';
import type { PageWithLayout } from '@listic/feature/layout';
import 'tailwindcss/tailwind.css';
import { OffCanvasProvider } from '@listic/ui/off-canvas';

function ListicApp({ Component, pageProps }: AppProps) {
  const getLayout = (Component as PageWithLayout).getLayout || ((page) => page);

  return (
    <OffCanvasProvider>
      {getLayout(<Component {...pageProps} />)}
    </OffCanvasProvider>
  );
}

export default ListicApp;
