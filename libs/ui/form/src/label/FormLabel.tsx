import { ComponentPropsWithoutRef } from 'react';
import { useFormControl } from '../control/useFormControl';

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
      className={`cursor-default select-none font-semibold disabled:opacity-50 required:after:inline-block required:after:ml-1 required:after:text-red-600 ${className}`}
    >
      {children}
    </label>
  );
};
