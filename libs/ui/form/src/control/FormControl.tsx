import { FormControlProvider } from './useFormControl';

export interface FormControlProps {
  id?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  className?: string;
}

export const FormControl: React.FC<FormControlProps> = ({
  children,
  className = '',
  ...controlProps
}) => {
  return (
    <FormControlProvider {...controlProps}>
      <div className={`flex flex-col gap-1 ${className}`}>{children}</div>
    </FormControlProvider>
  );
};
