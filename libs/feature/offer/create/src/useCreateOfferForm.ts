import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { useAuth } from '@listic/core/auth';
import { StorageLocation, storage } from '@listic/core/firebase';
import {
  createOffer,
  CreateOfferData,
  CreateOfferSchema,
} from '@listic/core/offer';
import { useUserProfile } from '@listic/core/user';
import { updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

type Awaited<T> = T extends Promise<infer R> ? R : never;

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
    const storageRef = ref(
      storage,
      `${StorageLocation.OFFERS}/${offerId}/${file.name}`
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
