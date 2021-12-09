import React from 'react';
import { Button, ButtonProps } from '.';

export interface IconButtonProps
  extends Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'loadingText'> {
  icon: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className = '', ...restProps }, ref) => {
    return (
      <Button ref={ref} className={`w-12 h-12 ${className}`} {...restProps}>
        {React.cloneElement(icon as React.ReactElement, {
          width: '1em',
          height: '1em',
        })}
      </Button>
    );
  }
);
