import { Container } from '@listic/ui/container';
import { Logo } from '@listic/ui/logo';
import Link from 'next/link';
import { Route } from '@listic/feature/route';
import { Button } from '@listic/ui/button';

export const Navbar: React.FC = () => {
  return (
    <div className="fixed bg-white left-0 top-0 w-full h-16">
      <Container className="h-full flex items-center justify-between">
        <Link passHref href={Route.LANDING_PAGE}>
          <a>
            <Logo />
          </a>
        </Link>
        <Button>Zaloguj się</Button>
      </Container>
    </div>
  );
};
