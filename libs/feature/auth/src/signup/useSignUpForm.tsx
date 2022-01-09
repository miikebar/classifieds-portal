import { useForm } from 'react-hook-form';
import { SignUpData, SignUpSchema } from '@listic/core/auth';
import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { useCallback, useMemo, useState } from 'react';
import { useAuth } from '@listic/react/auth/core';

interface UseSignUpFormProps {
  onSuccess?(): void;
  onError?(error: Error): void;
}

export const useSignUpForm = ({
  onSuccess,
  onError,
}: UseSignUpFormProps = {}) => {
  const [isPending, setPending] = useState(false);
  const { createUser } = useAuth();
  const { handleSubmit, ...form } = useForm<SignUpData>({
    resolver: superstructResolver(SignUpSchema),
  });

  const handleUserCreation = useCallback(
    async (data: SignUpData) => {
      try {
        setPending(true);
        await createUser(data);
        onSuccess?.();
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [createUser, onError, onSuccess]
  );

  const handler = useMemo(
    () => handleSubmit(handleUserCreation),
    [handleSubmit, handleUserCreation]
  );

  return { isPending, handleSubmit: handler, ...form };
};
