import { Container } from '@listic/ui/container';
import { Logo } from '@listic/ui/logo';
import Link from 'next/link';
import { Route } from '@listic/feature/route';
import { Button, IconButton } from '@listic/ui/button';
import { useOffCanvas } from '@listic/ui/off-canvas';
import { ReactComponent as BarsIcon } from '@listic/ui/icons/bars-solid.svg';

export const Navbar: React.FC = () => {
  const { open } = useOffCanvas();

  return (
    <div className="fixed bg-white left-0 top-0 w-full h-16 z-10">
      <Container className="h-full flex items-center justify-between">
        <div>
          <IconButton
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
        <Button>Zaloguj się</Button>
      </Container>
    </div>
  );
};