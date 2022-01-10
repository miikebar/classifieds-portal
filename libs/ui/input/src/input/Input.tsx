import React, { ComponentPropsWithoutRef } from 'react';
import cs from 'classnames';
import { useFormControl } from '@listic/ui/form';
import classes from './Input.module.css';

export interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isInvalid?: boolean;
  variant?: 'light' | 'dark';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      readOnly,
      disabled,
      isInvalid,
      required = true,
      variant = 'dark',
      ...inputProps
    },
    ref
  ) => {
    const control = useFormControl();

    const getHelperAriaProps = () => {
      return control.hasHelperText
        ? { 'aria-describedby': control.helperId }
        : {};
    };

    return (
      <input
        ref={ref}
        className={cs({
          [classes.root]: true,
          [base]: true,
          [variantDark]: variant === 'dark',
          [variantLight]: variant === 'light',
        })}
        id={control.inputId ?? id}
        required={control.isRequired ?? required}
        disabled={control.isDisabled ?? disabled}
        data-invalid={control.isInvalid ?? isInvalid}
        data-disabled={control.isDisabled ?? disabled}
        {...getHelperAriaProps()}
        {...inputProps}
      />
    );
  }
);

export const variantDark = 'bg-gray-200';
export const variantLight = 'bg-gray-100';
export const base =
  'w-full text-black placeholder-gray-500 p-3 outline-none rounded-md border-2 border-transparent transition-all focus:border-amber-400';
