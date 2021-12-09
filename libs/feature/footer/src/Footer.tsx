import { Logo } from '@listic/ui/logo';
import { Container } from '@listic/ui/container';
import { Route } from '@listic/feature/route';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white">
      <Container className="py-8">
        <Link passHref href={Route.LANDING_PAGE}>
          <a>
            <Logo />
          </a>
        </Link>
      </Container>
    </div>
  );
};
