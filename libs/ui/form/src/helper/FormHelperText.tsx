import { useFormControl } from '../control/useFormControl';

export const FormHelperText: React.FC = ({ children }) => {
  const { helperId, setHasHelperText } = useFormControl();

  return (
    <div
      ref={() => setHasHelperText(true)}
      id={helperId}
      className="text-sm text-gray-500"
    >
      {children}
    </div>
  );
};
