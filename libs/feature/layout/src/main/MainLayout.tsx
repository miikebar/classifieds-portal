import React from 'react';
import { getBaseLayout } from '../base/BaseLayout';
import { Navbar } from '@listic/feature/navbar';
import { Footer } from '@listic/feature/footer';

const MainLayout: React.FC = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen h-full">
      <Navbar />
      <div className="pt-16 flex-1 flex flex-col">{children}</div>
      <Footer />
    </div>
  );
};

export const getMainLayout = (page: React.ReactNode) => {
  return getBaseLayout(<MainLayout>{page}</MainLayout>);
};
