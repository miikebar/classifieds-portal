import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';
import { Search } from '@listic/feature/search';

const LandingPage: PageWithLayout = () => {
  return (
    <div className="flex flex-col">
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
            <Search />
          </div>
        </Container>
      </div>
      <Container>List</Container>
    </div>
  );
};

LandingPage.getLayout = getMainLayout;

export default LandingPage;
