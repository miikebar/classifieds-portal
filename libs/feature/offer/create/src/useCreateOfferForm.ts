import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { CreateOfferData, CreateOfferSchema } from '@listic/core/offer';
import { createOffer } from '@listic/core/offer';
import { useUserProfile } from '@listic/core/user';
import { useAuth } from '@listic/core/auth';

interface UseCreateOfferFormProps {
  onSuccess?(result: Awaited<ReturnType<typeof createOffer>>): void;
  onError?(error: Error): void;
}

export const useCreateOfferForm = ({
  onSuccess,
  onError,
}: UseCreateOfferFormProps = {}) => {
  const [isPending, setPending] = useState(false);
  const { uid } = useAuth();
  const { user } = useUserProfile();
  const { handleSubmit, ...form } = useForm<CreateOfferData>({
    resolver: superstructResolver(CreateOfferSchema),
    defaultValues: {
      category: 'default',
    },
  });

  const handleOfferCreation = useCallback(
    async (data: CreateOfferData) => {
      if (!user || !uid) {
        return onError?.(new Error('User is not authenticated'));
      }

      try {
        setPending(true);
        const result = await createOffer({
          ...data,
          owner: { ...user, id: uid },
        });
        onSuccess?.(result);
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [onError, onSuccess, uid, user]
  );

  const handler = useMemo(
    () => handleSubmit(handleOfferCreation),
    [handleOfferCreation, handleSubmit]
  );

  return {
    isPending,
    handleSubmit: handler,
    ...form,
  };
};
