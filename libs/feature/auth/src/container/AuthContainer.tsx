import React from 'react';

interface AuthContainerProps {
  header: React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({
  header,
  children,
}) => {
  return (
    <div className="flex flex-col">
      <div className="bg-blue-100 p-4">{header}</div>
      <div className="bg-white p-4">{children}</div>
    </div>
  );
};
