import { Route } from '@listic/feature/route';
import { Button } from '@listic/ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@listic/ui/form';
import { Input } from '@listic/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthContainer } from '../container/AuthContainer';
import { useSignUpForm } from './useSignUpForm';

export const AuthSignUpForm: React.FC = () => {
  const {
    isPending,
    register,
    handleSubmit,
    formState: { errors },
  } = useSignUpForm({
    onSuccess: () => {
      toast.success('Pomyślnie utworzono nowe konto');
    },
    onError: () => {
      toast.error('Podczas tworzenia konta wystąpił błąd. Spróbuj ponownie!');
    },
  });

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
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-0">
          <FormControl
            isRequired
            isInvalid={!!errors.name}
            className="lg:w-1/2 lg:pr-2"
          >
            <FormLabel>Imię</FormLabel>
            <Input
              placeholder="Podaj swoje imię"
              autoComplete="given-name"
              {...register('name')}
            />
            <FormErrorMessage>Pole jest wymagane</FormErrorMessage>
          </FormControl>
          <FormControl
            isRequired
            isInvalid={!!errors.surname}
            className="lg:w-1/2 lg:pl-2"
          >
            <FormLabel>Nazwisko</FormLabel>
            <Input
              placeholder="Podaj swoje nazwisko"
              autoComplete="family-name"
              {...register('surname')}
            />
            <FormErrorMessage>Pole jest wymagane</FormErrorMessage>
          </FormControl>
        </div>
        <FormControl isRequired isInvalid={!!errors.email}>
          <FormLabel>Adres email</FormLabel>
          <Input
            type="email"
            autoComplete="email"
            placeholder="Podaj swój adres email"
            {...register('email')}
          />
          <FormErrorMessage>Podaj poprawny adres email</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!!errors.password}>
          <FormLabel>Hasło</FormLabel>
          <Input
            type="password"
            autoComplete="new-password"
            placeholder="Ustaw hasło do konta"
            {...register('password')}
          />
          <FormErrorMessage>Hasło musi mieć minimum 6 znaków</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.phone}>
          <FormLabel>Numer telefonu</FormLabel>
          <Input
            type="tel"
            autoComplete="tel"
            placeholder="Podaj numer telefonu"
            {...register('phone')}
          />
        </FormControl>
        <Button
          isLoading={isPending}
          loadingText="Tworzenie konta"
          type="submit"
          className="h-12 mt-4"
        >
          Utwórz konto
        </Button>
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
