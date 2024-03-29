import React from 'react';

interface AuthContainerProps {
  header: React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  header,
  children,
}) => {
  return (
    <div className="flex w-full flex-col lg:h-3/5 relative lg:max-w-container">
      <div className=" bg-blue-100 px-4 py-8 lg:h-full lg:rounded-lg lg:shadow-sm lg:flex lg:items-center">
        <div className="lg:max-w-heroText lg:px-20">{header}</div>
      </div>
      <div className="bg-white px-4 py-8 lg:absolute lg:right-20 lg:w-2/5 lg:-top-12 lg:-bottom-12 lg:px-10 lg:rounded-lg lg:shadow-lg lg:flex lg:flex-col lg:justify-center">
        {children}
      </div>
    </div>
  );
};
