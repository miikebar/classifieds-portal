import { ComponentPropsWithoutRef } from 'react';

type ContainerProps = ComponentPropsWithoutRef<'div'>;

export const Container: React.FC<ContainerProps> = ({
  className = '',
  children,
  ...restProps
}) => {
  return (
    <div className={`max-w-container mx-auto px-4 ${className}`} {...restProps}>
      {children}
    </div>
  );
};
