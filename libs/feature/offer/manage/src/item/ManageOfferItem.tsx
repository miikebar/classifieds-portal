import { Collection } from '@listic/core-firebase-utils';
import { Product } from '@listic/core-payment';
import { Route } from '@listic/feature/route';
import { OfferWithId } from '@listic/react/offer/list';
import { useCreateCheckoutSession } from '@listic/react/payment';
import { Button } from '@listic/ui/button';
import format from 'date-fns/format';
import { Timestamp } from 'firebase-admin/firestore';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ManageOfferItemProps {
  offer: OfferWithId;
}

export const ManageOfferItem: React.FC<ManageOfferItemProps> = ({ offer }) => {
  const [isPending7Days, setPending7Days] = useState(false);
  const [isPending30Days, setPending30Days] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const isPending = isPending7Days || isPending30Days || isDeleting;
  const createCheckoutSession = useCreateCheckoutSession();

  const onDeleteClick = async () => {
    try {
      setDeleting(true);
      const [firestoreLite, deleteDoc, doc] = await Promise.all([
        import('@listic/core/firebase/firestore-lite').then(
          (m) => m.firestoreLite
        ),
        import('firebase/firestore/lite').then((m) => m.deleteDoc),
        import('firebase/firestore/lite').then((m) => m.doc),
      ]);

      await deleteDoc(doc(firestoreLite, Collection.OFFERS, offer.id));
      toast.success('Oferta została pomyślnie usunięta');
    } catch (error) {
      console.error(error);
      toast.error('Podczas usuwania oferty wystąpił błąd');
    } finally {
      setDeleting(false);
    }
  };

  const onPromoteClick = async (offerId: string, product: Product) => {
    const setPending =
      product === Product.PROMOTE_7_DAYS ? setPending7Days : setPending30Days;

    try {
      setPending(true);
      const {
        data: { redirect },
      } = await createCheckoutSession({
        offerId,
        product,
      });

      window.location.replace(redirect);
    } catch (error) {
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  const renderPromoteSection = () => {
    if (offer.isPromoted) {
      return (
        <div>
          Promowanie aktywne do{' '}
          {format((offer.promoteExpires as Timestamp).toDate(), 'dd.MM.yyyy')}
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-2">
        <Button
          variant="secondary"
          isLoading={isPending7Days}
          isDisabled={isPending}
          onClick={() => onPromoteClick(offer.id, Product.PROMOTE_7_DAYS)}
        >
          Promuj przez 7 dni
        </Button>
        <Button
          variant="secondary"
          isLoading={isPending30Days}
          isDisabled={isPending}
          onClick={() => onPromoteClick(offer.id, Product.PROMOTE_30_DAYS)}
        >
          Promuj przez 30 dni
        </Button>
        <div className="flex flex-col md:flex-row gap-2">
          <Link passHref href={`${Route.OFFER.EDIT}/${offer.id}`}>
            <Button
              as="a"
              isDisabled={isPending}
              variant="secondary"
              className="flex-1"
            >
              Edytuj
            </Button>
          </Link>
          <Button
            isLoading={isDeleting}
            loadingText="Usuwanie"
            isDisabled={isPending}
            variant="secondary"
            className="flex-1"
            onClick={onDeleteClick}
          >
            Usuń
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div
      key={offer.id}
      className="bg-white border p-4 rounded-md shadow-sm flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
    >
      <div className="flex flex-col">
        <Link passHref href={`${Route.OFFER.VIEW}/${offer.id}`}>
          <a className="text-xl font-bold">{offer.name}</a>
        </Link>
        <span className="text-gray-500">
          {format((offer.createdAt as Timestamp).toDate(), 'dd.MM.yyyy')}
        </span>
        <span className="text-gray-500">
          Status: {offer.isActive ? 'Aktywna' : 'Zakończona'}
        </span>
      </div>
      {renderPromoteSection()}
    </div>
  );
};
