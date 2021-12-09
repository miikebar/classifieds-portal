import React from 'react';
import { OffCanvasMenu } from '@listic/ui/off-canvas';

const BaseLayout: React.FC = ({ children }) => {
  return (
    <>
      <OffCanvasMenu />
      {children}
    </>
  );
};

export const getBaseLayout = (page: React.ReactNode) => {
  return <BaseLayout>{page}</BaseLayout>;
};
