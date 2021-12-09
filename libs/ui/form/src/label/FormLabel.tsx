import { ComponentPropsWithoutRef } from 'react';
import { useFormControl } from '../control/useFormControl';
import classes from './FormLabel.module.css';

export const FormLabel: React.FC<ComponentPropsWithoutRef<'label'>> = ({
  children,
  className = '',
  ...labelProps
}) => {
  const control = useFormControl();

  return (
    <label
      {...labelProps}
      id={control.labelId}
      htmlFor={control.inputId}
      data-disabled={control.isDisabled}
      data-required={control.isRequired}
      className={`${classes.root} cursor-default select-none font-semibold disabled:opacity-50 ${className}`}
    >
      {children}
    </label>
  );
};
