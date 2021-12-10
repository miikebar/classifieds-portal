import { Card } from '@listic/ui/card';
import { FormControl, FormErrorMessage, FormLabel } from '@listic/ui/form';
import { Input, Select, Textarea } from '@listic/ui/input';
import { Button } from '@listic/ui/button';
import { categories } from '@listic/core/categories';
import { useCreateOfferForm } from './useCreateOfferForm';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import { Route } from '@listic/feature/route';

export const CreateOfferForm: React.FC = () => {
  const router = useRouter();
  const {
    register,
    isPending,
    handleSubmit,
    formState: { errors },
  } = useCreateOfferForm({
    onSuccess: ({ id, offer }) => {
      toast.success('Oferta została pomyślnie opublikowana');
      router.push(`${Route.OFFER.VIEW}/${id}.${offer.slug}`);
    },
    onError: () => {
      toast.error('Podczas dodawania oferty wystąpił błąd. Spróbuj ponownie!');
    },
  });

  return (
    <form noValidate className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        </div>
      </Card>
      <Card>
        <Card.Header>
          <Card.Title>Zdjęcia</Card.Title>
          <Card.Subtitle>
            Dodaj do 15 zdjęć. Pierwsze zostanie użyte jako miniatura ogłoszenia
          </Card.Subtitle>
        </Card.Header>
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
            Dodaj ogłoszenie
          </Button>
        </div>
      </Card>
    </form>
  );
};
