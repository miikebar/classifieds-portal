import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { useAuth } from '@listic/react/auth/core';
import { SignInData, SignInSchema } from '@listic/core/auth';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Infer, object } from 'superstruct';
import { email } from '@listic/core/schema';
import { firebaseAuth } from '@listic/core/firebase/auth';

const ResetPasswordSchema = object({
  email: email(),
});

export type ResetPasswordData = Infer<typeof ResetPasswordSchema>;

interface UsePasswordResetForm {
  onSuccess?(): void;
  onError?(error: Error): void;
}

export const usePasswordResetForm = ({
  onSuccess,
  onError,
}: UsePasswordResetForm = {}) => {
  const [isPending, setPending] = useState(false);
  const { handleSubmit, ...form } = useForm<ResetPasswordData>({
    resolver: superstructResolver(ResetPasswordSchema),
  });

  const handleSignIn = useCallback(
    async ({ email }: ResetPasswordData) => {
      try {
        setPending(true);
        const sendPasswordResetEmail = await import('firebase/auth').then(
          (m) => m.sendPasswordResetEmail
        );
        await sendPasswordResetEmail(firebaseAuth, email);
        onSuccess?.();
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [onError, onSuccess]
  );

  const handler = useMemo(
    () => handleSubmit(handleSignIn),
    [handleSubmit, handleSignIn]
  );

  return { isPending, handlePasswordReset: handler, ...form };
};
