import { categories } from '@listic/core/categories';
import { Route } from '@listic/feature/route';
import { LocationInput } from '@listic/feature/search';
import { Button } from '@listic/ui/button';
import { Card } from '@listic/ui/card';
import { FormControl, FormErrorMessage, FormLabel } from '@listic/ui/form';
import { Input, Select, Textarea } from '@listic/ui/input';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useEditOffer } from './useEditOffer';

interface EditOfferFormProps {
  offerId: string;
}

export const EditOfferForm: React.FC<EditOfferFormProps> = ({ offerId }) => {
  const router = useRouter();

  const {
    register,
    offer,
    getValues,
    isPending,
    hasImageError,
    handleOfferUpdate,
    setValue,
    dropzone,
    files,
    removeFile,
    formState: { errors },
  } = useEditOffer({
    offerId,
    onSuccess: () => {
      toast.success(
        'Sukces! Za chwile zostaniesz przekierowany na stronę ze swoją ofertą!'
      );
      router.push(`${Route.OFFER.VIEW}/${offerId}.${offer.data?.slug}`);
    },
    onError: () => {
      toast.error('Podczas dodawania oferty wystąpił błąd. Spróbuj ponownie!');
    },
  });

  useEffect(() => {
    if (!offer.exists) {
      router.push('/404');
    }
  }, [offer.exists, router]);

  const location = getValues('location') ?? offer.data?.location;

  const renderThumbnails = () => {
    return files.map((file) => (
      <div
        key={file.preview}
        className="aspect-square rounded-md overflow-hidden shadow-sm relative"
      >
        <button
          type="button"
          className="absolute top-2 right-2 bg-gray-200 w-6 h-6 grid place-content-center rounded-md"
          onClick={() => removeFile(file.preview)}
        >
          &times;
        </button>
        <img src={file.preview} className="w-full h-full object-cover" />
      </div>
    ));
  };

  return (
    <form
      noValidate
      className="flex flex-col gap-4 create-offer"
      onSubmit={handleOfferUpdate}
    >
      <Card>
        <Card.Header>
          <Card.Title>Szczegóły ogłoszenia</Card.Title>
          <Card.Subtitle>
            Nazwa oraz kategoria zadecydują o tym w jaki sposób użytkownicy
            znajdą Twoją ofertę
          </Card.Subtitle>
        </Card.Header>
        <div className="flex flex-col gap-8">
          <FormControl isRequired isInvalid={!!errors.name}>
            <FormLabel>Nazwa ogłoszenia</FormLabel>
            <Input
              variant="light"
              placeholder="np. MacBook Pro M1 Max"
              {...register('name')}
            />
            <FormErrorMessage>
              Nazwa ogłoszenia nie może być pusta
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.category}>
            <FormLabel>Kategoria</FormLabel>
            <Select {...register('category')}>
              <option value="default" disabled>
                Wybierz kategorię dla swojego ogłoszenia
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              Przypisz ogłoszenie do jednej z kategorii
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors.price}>
            <FormLabel>Cena</FormLabel>
            <Input
              variant="light"
              type="number"
              placeholder="Podaj cenę wystawianego przedmiotu"
              {...register('price', { valueAsNumber: true })}
            />
            <FormErrorMessage>
              Podaj prawidłową cenę. Minimalna kwota to 0 zł
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={!!errors._geoloc}>
            <FormLabel>Lokalizacja</FormLabel>
            <LocationInput
              value={location}
              onPlaceSelect={(place, name) => {
                setValue('_geoloc', place as any);
                setValue('location', name ?? '');
              }}
            />
            <FormErrorMessage>Wybierz lokalizację ogłoszenia</FormErrorMessage>
          </FormControl>
        </div>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Zdjęcia</Card.Title>
          <Card.Subtitle>
            Dodaj do 15 zdjęć. Pierwsze zostanie użyte jako miniatura ogłoszenia
          </Card.Subtitle>
        </Card.Header>
        <FormControl isInvalid={hasImageError}>
          <div
            {...dropzone.getRootProps({
              className:
                'bg-gray-100 px-4 py-8 text-center rounded-md cursor-pointer',
            })}
          >
            <input {...dropzone.getInputProps()} />
            <p>Kliknij tutaj lub przeciągnij i upuść zdjęcia</p>
          </div>
          <div className="mt-4 grid gap-4 lg:grid-cols-5">
            {renderThumbnails()}
          </div>
          <FormErrorMessage>
            Musisz dodać przynajmniej jedno zdjęcie!
          </FormErrorMessage>
        </FormControl>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Opis</Card.Title>
          <Card.Subtitle>
            Opisz swoje ogłoszenie. Dobrze napisany opis zachęci kupujących!
          </Card.Subtitle>
        </Card.Header>
        <FormControl isRequired isInvalid={!!errors.description}>
          <Textarea
            variant="light"
            placeholder="Opisz przedmiot, który chcesz sprzedać. W opisie zamieść informacje, które sam uznałbyś za przydatne podczas zakupów"
            {...register('description')}
          />
          <FormErrorMessage>
            Opis ogłoszenia nie może być pusty
          </FormErrorMessage>
        </FormControl>
      </Card>
      <Card>
        <div className="flex justify-center">
          <Button
            isLoading={isPending}
            loadingText="Publikowanie ogłoszenia"
            type="submit"
            className="h-12 px-8"
          >
            Zapisz ogłoszenie
          </Button>
        </div>
      </Card>
    </form>
  );
};
