import React from 'react';
import { getBaseLayout } from '../base/BaseLayout';
import { Navbar } from '@listic/feature/navbar';

const NavbarLayout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
};

export const getNavbarLayout = (page: React.ReactNode) => {
  return getBaseLayout(<NavbarLayout>{page}</NavbarLayout>);
};
