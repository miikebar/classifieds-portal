import { ComponentPropsWithoutRef } from 'react';

export const CardTitle: React.FC<ComponentPropsWithoutRef<'span'>> = ({
  className = '',
  ...props
}) => {
  return <span className={`${className} text-xl font-bold `} {...props} />;
};
