import { Container } from '@listic/ui/container';
import { Logo } from '@listic/ui/logo';
import Link from 'next/link';
import { Route } from '@listic/feature/route';
import { Button, IconButton } from '@listic/ui/button';
import { useOffCanvas } from '@listic/ui/off-canvas';
import { ReactComponent as BarsIcon } from '@listic/ui/icons/bars-solid.svg';
import { useAuth } from '@listic/react/auth/core';
import { useUserProfile } from '@listic/core/user';
import { ReactComponent as IconPlus } from '@listic/ui/icons/plus-solid.svg';

export const Navbar: React.FC = () => {
  const { open } = useOffCanvas();
  const { isAuthenticated, signOut } = useAuth();
  const { user } = useUserProfile();

  return (
    <div className="fixed bg-white left-0 top-0 w-full h-16 z-10">
      <Container className="h-full flex items-center justify-between">
        <div>
          <IconButton
            variant="ghost"
            icon={<BarsIcon />}
            onClick={open}
            className="md:hidden mr-2"
          />
          <Link passHref href={Route.LANDING_PAGE}>
            <a>
              <Logo />
            </a>
          </Link>
        </div>
        {!isAuthenticated && (
          <div className="flex gap-2">
            <Link passHref href={Route.AUTH.SIGN_UP}>
              <Button as="a" variant="ghost" className="hidden md:block">
                Utwórz konto
              </Button>
            </Link>
            <Link passHref href={Route.AUTH.SIGN_IN}>
              <Button as="a">Zaloguj się</Button>
            </Link>
          </div>
        )}
        {user && (
          <div className="flex gap-6 items-center">
            <Link passHref href={Route.CHAT}>
              <a>Wiadomości</a>
            </Link>
            <Link passHref href={Route.OFFER.CREATE}>
              <Button as="a" leftIcon={<IconPlus />}>
                Dodaj ogłoszenie
              </Button>
            </Link>
            <span className="cursor-pointer" onClick={signOut}>
              {user.name} {user.surname}
            </span>
          </div>
        )}
      </Container>
    </div>
  );
};
