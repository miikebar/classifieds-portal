import React, { ComponentPropsWithoutRef } from 'react';
import { useFormControl } from '@listic/ui/form';
import classes from './Input.module.css';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  isInvalid?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { id, readOnly, disabled, isInvalid, required = true, ...inputProps },
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
        className={`${classes.root} bg-gray-200 text-black placeholder-gray-800 p-3 outline-none rounded-md border-2 border-transparent transition-all focus:border-amber-400`}
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
