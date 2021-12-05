import React from 'react';

const BaseLayout: React.FC = ({ children }) => {
  return <div>{children}</div>;
};

export const getBaseLayout = (page: React.ReactNode) => {
  return <BaseLayout>{page}</BaseLayout>;
};
