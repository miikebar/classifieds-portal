import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';
import { Search } from '@listic/feature/search';
import { OfferList } from '@listic/feature/offer/list';
import { useState } from 'react';
import { Offer } from '@listic/feature-offer-types';

const LandingPage: PageWithLayout = () => {
  const [query, setQuery] = useState('');
  const [radius, setRadius] = useState<number | 'all'>(1);
  const [location, setLocation] = useState<Offer['_geoloc'] | null>(null);

  return (
    <div className="flex-1 flex flex-col bg-gray-100">
      <div className="flex flex-col min-h-hero bg-blue-50 py-8">
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
            <Search
              onQueryChange={(query, location, radius) => {
                setQuery(query);
                setLocation(location);
                setRadius(radius);
              }}
            />
          </div>
        </Container>
      </div>
      <Container className="my-8">
        <OfferList query={query} location={location} radius={radius} />
      </Container>
    </div>
  );
};

LandingPage.getLayout = getMainLayout;

export default LandingPage;
