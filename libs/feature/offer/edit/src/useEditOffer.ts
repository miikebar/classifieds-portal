import { superstructResolver } from '@hookform/resolvers/superstruct/dist/superstruct';
import { Collection } from '@listic/core-firebase-utils';
import { firestoreLite } from '@listic/core/firebase/firestore-lite';
import { CreateOfferData, CreateOfferSchema } from '@listic/core/offer';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { useOffer } from './useOffer';
import { Storage } from '@listic/core-firebase-utils';

interface UseEditOfferProps {
  offerId: string;
  onSuccess?(): void;
  onError?(error: Error): void;
}

export const useEditOffer = ({
  offerId,
  onSuccess,
  onError,
}: UseEditOfferProps) => {
  const offer = useOffer({ offerId });
  const [isPending, setPending] = useState(false);
  const { handleSubmit, setValue, ...form } = useForm<CreateOfferData>({
    resolver: superstructResolver(CreateOfferSchema),
    defaultValues: {
      category: 'default',
    },
  });
  const [files, setFiles] = useState<(File & { preview: string })[]>([]);
  const dropzone = useDropzone({
    accept: 'image/*',
    maxFiles: 15,
    onDrop: (acceptedFiles) => {
      setFiles((current) => [
        ...current,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    },
  });
  const hasImageError =
    !files.length &&
    (form.formState.isSubmitting || form.formState.isSubmitted);

  useEffect(() => {
    if (!offer.exists || !offer.data) {
      return;
    }

    const data = offer.data;
    setValue('name', data.name);
    setValue('category', data.category);
    setValue('price', data.price);
    setValue('location', data.location);
    setValue('_geoloc', data._geoloc);
    setValue('description', data.description);
    setFiles((data.images ?? []).map((img) => ({ preview: img } as any)));
  }, [offer.data, offer.exists, setValue]);

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

  const uploadFiles = useCallback(() => {
    return Promise.all(
      files
        .filter((file) => Object.keys(file).length > 1)
        .map((file) => uploadFile(offerId, file))
    );
  }, [files, offerId, uploadFile]);

  const updateOffer = useCallback(
    async (data: CreateOfferData) => {
      if (!files.length) {
        return;
      }

      const images = files
        .filter((file) => Object.keys(file).length === 1)
        .map((file) => file.preview);
      const uploaded = await uploadFiles();

      console.log([...images, ...uploaded]);

      try {
        setPending(true);
        await updateDoc(doc(firestoreLite, Collection.OFFERS, offerId), {
          ...data,
          images: [...images, ...uploaded],
        });
        onSuccess?.();
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [files, offerId, onError, onSuccess, uploadFiles]
  );

  return {
    isPending,
    offer,
    removeFile,
    hasImageError,
    handleOfferUpdate: handleSubmit(updateOffer),
    dropzone,
    setValue,
    files,
    ...form,
  };
};
