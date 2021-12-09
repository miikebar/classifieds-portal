import React, { createContext, useContext, useMemo, useState } from 'react';
import { FormControlProps } from './FormControl';
import { useId } from '@reach/auto-id';

type FormControlContextData = ReturnType<typeof useProvideFormControl>;

const FormControlContext = createContext<FormControlContextData>(
  {} as FormControlContextData
);

export const FormControlProvider: React.FC<FormControlProps> = ({
  children,
  ...controlProps
}) => {
  const value = useProvideFormControl(controlProps);
  return (
    <FormControlContext.Provider value={value}>
      {children}
    </FormControlContext.Provider>
  );
};

const useProvideFormControl = ({
  id,
  isInvalid,
  isDisabled,
  isReadOnly,
  isRequired,
}: FormControlProps) => {
  const generatedId = useId();
  const _id = id ?? generatedId;
  const [hasHelperText, setHasHelperText] = useState(false);

  return useMemo(
    () => ({
      id: _id,
      isInvalid,
      isDisabled,
      isReadOnly,
      isRequired,
      inputId: `field-${_id}-input`,
      labelId: `field-${_id}-label`,
      helperId: `field-${_id}-helper`,
      errorId: `field-${_id}-error`,
      hasHelperText,
      setHasHelperText,
    }),
    [_id, hasHelperText, isDisabled, isInvalid, isReadOnly, isRequired]
  );
};

export const useFormControl = () => {
  return useContext(FormControlContext);
};
