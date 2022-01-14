import React, { ComponentPropsWithoutRef } from 'react';
import { base, InputProps, variantDark, variantLight } from '..';
import classes from '../input/Input.module.css';
import cs from 'classnames';
import { useFormControl } from '@listic/ui/form';

interface SelectProps extends ComponentPropsWithoutRef<'select'> {
  variant?: InputProps['variant'];
  isInvalid?: boolean;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      id,
      disabled,
      isInvalid,
      required = true,
      variant = 'light',
      className = '',
      ...props
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
      <select
        ref={ref}
        className={cs({
          [classes.root]: true,
          [className]: true,
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
        {...props}
      />
    );
  }
);
