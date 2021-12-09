import { useFormControl } from '../control/useFormControl';

export const FormErrorMessage: React.FC = ({ children }) => {
  const control = useFormControl();

  if (!control.isInvalid) {
    return null;
  }

  return (
    <span
      id={control.errorId}
      className="text-sm text-red-600"
      aria-live="polite"
    >
      {children}
    </span>
  );
};
