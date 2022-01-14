import { Route } from '@listic/feature/route';
import { Button } from '@listic/ui/button';
import { FormControl, FormErrorMessage, FormLabel } from '@listic/ui/form';
import { Input } from '@listic/ui/input';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { AuthContainer } from '../container/AuthContainer';
import { useSignInForm } from './useSignInForm';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { usePasswordResetForm } from './usePasswordResetForm';

export const AuthSignInForm: React.FC = () => {
  const router = useRouter();
  const {
    isPending,
    register,
    handleSubmit,
    formState: { errors },
  } = useSignInForm({
    onSuccess: () => {
      toast.success('Pomyślnie zalogowano do serwisu');
      router.push(Route.LANDING_PAGE);
    },
    onError: () => {
      toast.error('Podczas logowania wystąpił błąd. Spróbuj ponownie!');
    },
  });
  const [isResetingPassword, setResetingPassword] = useState(false);
  const passwordReset = usePasswordResetForm({
    onSuccess: () => {
      toast.success(
        'Na podany adres email została wysłana wiadomość z instrukcją resetu hasła.'
      );
      setResetingPassword(false);
    },
    onError: () => {
      toast.error(
        'Nie udało się wygenerować linku do resetu hasła dla podanego adresu email'
      );
    },
  });

  const renderSignIn = () => {
    return (
      <>
        <div className="flex flex-col gap-6 mb-6">
          <h2 className="font-bold text-3xl">Zaloguj się</h2>
          <p className="leading-relaxed">
            Użyj swoich danych aby zalogować się do serwisu i kontynuować
            sprzedaż i zakupy
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={handleSubmit}
          noValidate
        >
          <FormControl isInvalid={!!errors.email}>
            <FormLabel>Adres email</FormLabel>
            <Input
              key="signin:email"
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
              autoComplete="current-password"
              placeholder="Podaj hasło do konta"
              {...register('password')}
            />
            <FormErrorMessage>
              Hasło musi mieć minimum 6 znaków
            </FormErrorMessage>
          </FormControl>
          <Button
            isLoading={isPending}
            loadingText="Logowanie"
            type="submit"
            className="h-12 mt-4"
          >
            Zaloguj się
          </Button>
        </form>
        <div className="text-center mt-10 pb-4">
          Nie masz jeszcze konta?{' '}
          <Link passHref href={Route.AUTH.SIGN_UP}>
            <a className="font-bold hover:underline">Zarejestruj się</a>
          </Link>
          <button
            className="mt-3 hover:underline"
            onClick={() => setResetingPassword(true)}
          >
            Nie pamiętasz hasła?
          </button>
        </div>
      </>
    );
  };

  const renderResetPassword = () => {
    return (
      <>
        <div className="flex flex-col gap-6 mb-6">
          <h2 className="font-bold text-3xl">Reset hasła</h2>
          <p className="leading-relaxed">
            Podaj adres email, którego użyto podczas rejestracji w serwisie.
            Zostanie na niego wysłany link, służąćy do resetu hasła.
          </p>
        </div>
        <form
          className="flex flex-col gap-4"
          onSubmit={passwordReset.handlePasswordReset}
          noValidate
        >
          <FormControl isInvalid={!!passwordReset.formState.errors.email}>
            <FormLabel>Adres email</FormLabel>
            <Input
              key="reset:email"
              type="email"
              autoComplete="email"
              placeholder="Podaj swój adres email"
              {...passwordReset.register('email')}
            />
            <FormErrorMessage>Podaj poprawny adres email</FormErrorMessage>
          </FormControl>
          <Button
            isLoading={passwordReset.isPending}
            loadingText="Resetowanie hasła"
            type="submit"
            className="h-12 mt-4"
          >
            Zresetuj hasło
          </Button>
        </form>
        <div className="text-center mt-10 pb-4">
          <button
            className="mt-3 hover:underline"
            onClick={() => setResetingPassword(false)}
          >
            Wróć do logowania
          </button>
        </div>
      </>
    );
  };

  const renderHeader = () => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold mb-2">Witaj z powrotem!</h2>
        <p className="leading-relaxed">
          Cieszymy się, że z nami jesteś! Zaloguj się i zarządzaj swoimi
          ogłoszeniami oraz kontynuuj rozmowę z potencjalnymi klientami
        </p>
      </div>
    );
  };

  return (
    <AuthContainer header={renderHeader()}>
      {!isResetingPassword ? renderSignIn() : renderResetPassword()}
    </AuthContainer>
  );
};
