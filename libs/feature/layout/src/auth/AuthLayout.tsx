import React from 'react';
import { getMainLayout } from '..';

const AuthLayout: React.FC = ({ children }) => {
  return (
    <div className="flex-1 bg-gray-100 lg:grid lg:place-items-center">
      {children}
    </div>
  );
};

export const getAuthLayout = (page: React.ReactNode) => {
  return getMainLayout(<AuthLayout>{page}</AuthLayout>);
};
