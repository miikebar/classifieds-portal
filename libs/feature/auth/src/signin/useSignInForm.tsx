import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { useAuth } from '@listic/core/auth';
import { SignInData, SignInSchema } from '@listic/core/auth';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

interface UseSignUpFormProps {
  onSuccess?(): void;
  onError?(error: Error): void;
}

export const useSignInForm = ({
  onSuccess,
  onError,
}: UseSignUpFormProps = {}) => {
  const [isPending, setPending] = useState(false);
  const { signIn } = useAuth();
  const { handleSubmit, ...form } = useForm<SignInData>({
    resolver: superstructResolver(SignInSchema),
  });

  const handleSignIn = useCallback(
    async (data: SignInData) => {
      try {
        setPending(true);
        await signIn(data);
        onSuccess?.();
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [onError, onSuccess, signIn]
  );

  const handler = useMemo(
    () => handleSubmit(handleSignIn),
    [handleSubmit, handleSignIn]
  );

  return { isPending, handleSubmit: handler, ...form };
};
