import { Transition } from '@headlessui/react';
import { useUserProfile } from '@listic/core/user';
import { Route } from '@listic/feature/route';
import { useAuth } from '@listic/react/auth/core';
import { Button } from '@listic/ui/button';
import React from 'react';
import Link from 'next/link';
import { useOffCanvas } from './useOffCanvas';
import { ReactComponent as IconPlus } from '@listic/ui/icons/plus-solid.svg';
import { Logo } from '@listic/ui/logo';

export const OffCanvasMenu: React.FC = () => {
  const { isOpen, close } = useOffCanvas();
  const { isAuthenticated, signOut } = useAuth();
  const { user } = useUserProfile();

  return (
    <Transition show={isOpen}>
      <Transition.Child
        as={React.Fragment}
        enter="transition-opacity"
        enterFrom="opacity-0"
        enterTo="opacity-60"
        entered="opacity-60"
        leave="transition-opacity"
        leaveFrom="opacity-60"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 z-20 bg-black" onClick={close} />
      </Transition.Child>
      <Transition.Child
        as={React.Fragment}
        enter="transition-all"
        enterFrom="-translate-x-full"
        leave="transition-all"
        leaveTo="-translate-x-full"
      >
        <div className="fixed left-0 top-0 h-screen w-off-canvas z-30 bg-white shadow-md flex flex-col p-4">
          <div className="mb-10">
            <Logo />
          </div>
          {!isAuthenticated && (
            <div className="flex flex-col gap-2">
              <Link passHref href={Route.LANDING_PAGE}>
                <Button
                  as="a"
                  variant="ghost"
                  className="block"
                  onClick={close}
                >
                  Strona główna
                </Button>
              </Link>
              <Link passHref href={Route.AUTH.SIGN_UP}>
                <Button
                  as="a"
                  variant="ghost"
                  className="block"
                  onClick={close}
                >
                  Utwórz konto
                </Button>
              </Link>
              <Link passHref href={Route.AUTH.SIGN_IN}>
                <Button as="a" onClick={close}>
                  Zaloguj się
                </Button>
              </Link>
            </div>
          )}
          {isAuthenticated && (
            <div className="gap-2 items-start flex flex-col">
              <Link passHref href={Route.LANDING_PAGE}>
                <Button
                  as="a"
                  variant="ghost"
                  className="block"
                  onClick={close}
                >
                  Strona główna
                </Button>
              </Link>
              <Link passHref href={Route.CHAT}>
                <Button as="a" variant="ghost" onClick={close}>
                  Wiadomości
                </Button>
              </Link>
              <Link passHref href={Route.OFFER.VIEW}>
                <Button as="a" variant="ghost" onClick={close}>
                  Moje ogłoszenia
                </Button>
              </Link>
              <Link passHref href={Route.OFFER.CREATE}>
                <Button as="a" leftIcon={<IconPlus />} onClick={close}>
                  Dodaj ogłoszenie
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => {
                  close();
                  signOut();
                }}
              >
                Wyloguj
              </Button>
            </div>
          )}
        </div>
      </Transition.Child>
    </Transition>
  );
};
