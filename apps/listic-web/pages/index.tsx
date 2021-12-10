import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';
import { Search } from '@listic/feature/search';
import { OfferList } from '@listic/feature/offer/list';
import { useState } from 'react';

const LandingPage: PageWithLayout = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="flex flex-col min-h-hero bg-blue-50">
        <Container className="flex flex-1 justify-center items-center md:justify-start">
          <div className="flex flex-col sm:px-16 lg:px-0 w-full">
            <div className="max-w-heroText">
              <span className="block mb-1 md:text-xl md:mb-2">
                Witaj w Listic!
              </span>
              <h1 className="text-3xl font-bold mb-4 md:text-5xl md:mb-8">
                Znajdź to czego potrzebujesz!
              </h1>
              <p className="text-lg font-light mb-8">
                Na Listic znajdziesz ogłoszenia sprzedaży z szerokiej gamy
                kategorii. Przeglądaj, szukaj, rozmawiaj i kupuj - wszystko
                czego potrzebujesz jest w zasięgu Twojej ręki!
              </p>
            </div>
            <Search onQueryChange={setQuery} />
          </div>
        </Container>
      </div>
      <Container className="mt-8">
        <OfferList query={query} />
      </Container>
    </div>
  );
};

LandingPage.getLayout = getMainLayout;

export default LandingPage;
