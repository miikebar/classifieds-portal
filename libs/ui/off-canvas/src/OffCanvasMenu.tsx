import { Transition } from '@headlessui/react';
import React from 'react';
import { useOffCanvas } from './useOffCanvas';

export const OffCanvasMenu: React.FC = () => {
  const { isOpen, close } = useOffCanvas();

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
        <div className="fixed left-0 top-0 h-screen w-off-canvas z-30 bg-white shadow-md">
          Hello
        </div>
      </Transition.Child>
    </Transition>
  );
};
