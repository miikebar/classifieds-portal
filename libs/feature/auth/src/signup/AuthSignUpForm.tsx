import { AuthContainer } from '../container/AuthContainer';
import { FormControl, FormLabel } from '@listic/ui/form';
import { Input } from '@listic/ui/input';
import { Button } from '@listic/ui/button';
import { Route } from '@listic/feature/route';
import Link from 'next/link';

export const AuthSignUpForm: React.FC = () => {
  const renderHeader = () => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold mb-2">
          Listic jest i zawsze będzie darmowy
        </h2>
        <p className="leading-relaxed">
          Listic to platforma z ogłoszeniami, na której możesz sprzedawać oraz
          wyszukiwać ogłoszenia z ofertami sprzedaży. Przeglądaj kategorię i
          oferty aby znaleźć coś dla siebie!
        </p>
      </div>
    );
  };

  return (
    <AuthContainer header={renderHeader()}>
      <div className="flex flex-col gap-6 mb-6">
        <h2 className="font-bold text-3xl">Utwórz konto</h2>
        <p className="leading-relaxed">
          Wypełnij poniższy formularz i zacznij korzystać z Listic w pełni już
          dziś!
        </p>
      </div>
      <form className="flex flex-col gap-4">
        <FormControl>
          <FormLabel>Imię</FormLabel>
          <Input placeholder="Podaj swoje imię" />
        </FormControl>
        <FormControl>
          <FormLabel>Nazwisko</FormLabel>
          <Input placeholder="Podaj swoje nazwisko" />
        </FormControl>
        <FormControl>
          <FormLabel>Adres email</FormLabel>
          <Input type="email" placeholder="Podaj swój adres email" />
        </FormControl>
        <FormControl>
          <FormLabel>Numer telefonu</FormLabel>
          <Input type="tel" placeholder="Podaj numer telefonu" />
        </FormControl>
        <Button className="h-12 mt-4">Utwórz konto</Button>
      </form>
      <div className="text-center mt-10 pb-4">
        Masz już konto?{' '}
        <Link passHref href={Route.AUTH.SIGN_IN}>
          <a className="font-bold hover:underline">Zaloguj się</a>
        </Link>
      </div>
    </AuthContainer>
  );
};
