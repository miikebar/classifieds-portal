import React, { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ isInvalid, ...inputProps }, ref) => {
    return <input ref={ref} {...inputProps} />;
  }
);
