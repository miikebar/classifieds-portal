import React, { ComponentPropsWithoutRef } from 'react';
import cs from 'classnames';
import { base, InputProps, variantDark, variantLight } from '..';
import classes from '../input/Input.module.css';
import { useFormControl } from '@listic/ui/form';

interface TextareaProps extends ComponentPropsWithoutRef<'textarea'> {
  variant?: InputProps['variant'];
  isInvalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      id,
      readOnly,
      disabled,
      isInvalid,
      required = true,
      variant = 'dark',
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
      <textarea
        ref={ref}
        className={cs({
          'min-h-textarea': true,
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
        {...props}
      />
    );
  }
);
