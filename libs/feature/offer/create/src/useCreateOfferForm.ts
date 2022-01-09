import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { Storage } from '@listic/core-firebase-utils';
import {
  createOffer,
  CreateOfferData,
  CreateOfferSchema,
} from '@listic/core/offer';
import type { Awaited } from '@listic/core/types';
import { useUserProfile } from '@listic/core/user';
import { useAuth } from '@listic/react/auth/core';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

interface UseCreateOfferFormProps {
  onSuccess?(result: Awaited<ReturnType<typeof createOffer>>): void;
  onError?(error: Error): void;
}

export const useCreateOfferForm = ({
  onSuccess,
  onError,
}: UseCreateOfferFormProps = {}) => {
  const { uid } = useAuth();
  const { user } = useUserProfile();
  const [isPending, setPending] = useState(false);
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const { handleSubmit, ...form } = useForm<CreateOfferData>({
    resolver: superstructResolver(CreateOfferSchema),
    defaultValues: {
      category: 'default',
    },
  });
  const dropzone = useDropzone({
    accept: 'image/*',
    maxFiles: 15,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  useEffect(() => {
    const _files = files;
    return () => {
      _files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const removeFile = useCallback((preview: string) => {
    setFiles((current) => current.filter((file) => file.preview !== preview));
  }, []);

  const uploadFile = useCallback(async (offerId: string, file: File) => {
    const [firebaseStorage, ref, uploadBytes, getDownloadURL] =
      await Promise.all([
        import('@listic/core/firebase/storage').then((m) => m.firebaseStorage),
        import('firebase/storage').then((m) => m.ref),
        import('firebase/storage').then((m) => m.uploadBytes),
        import('firebase/storage').then((m) => m.getDownloadURL),
      ]);

    const storageRef = ref(
      firebaseStorage,
      `${Storage.OFFERS}/${offerId}/${file.name}`
    );
    const result = await uploadBytes(storageRef, file);
    return getDownloadURL(result.ref);
  }, []);

  const uploadFiles = useCallback(
    (offerId: string) => {
      return Promise.all(files.map((file) => uploadFile(offerId, file)));
    },
    [files, uploadFile]
  );

  const handleOfferCreation = useCallback(
    async (data: CreateOfferData) => {
      if (!user || !uid) {
        return onError?.(new Error('User is not authenticated'));
      }

      try {
        setPending(true);
        const updateDoc = await import('firebase/firestore/lite').then(
          (m) => m.updateDoc
        );
        const result = await createOffer({
          ...data,
          owner: { ...user, id: uid },
        });
        const images = await uploadFiles(result.id);
        if (images.length) {
          await updateDoc(result.docRef, { images });
        }
        onSuccess?.({ ...result, offer: { ...result.offer, images } });
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [onError, onSuccess, uid, uploadFiles, user]
  );

  const handler = useMemo(
    () => handleSubmit(handleOfferCreation),
    [handleOfferCreation, handleSubmit]
  );

  return {
    isPending,
    handleSubmit: handler,
    removeFile,
    dropzone,
    files,
    ...form,
  };
};
