import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';
import { OfferWithId, useUserOffers } from '@listic/react/offer/list';
import { useCreateCheckoutSession } from '@listic/react/payment';
import { Button } from '@listic/ui/button';
import { Product } from '@listic/core-payment';
import { useEffect, useState } from 'react';
import format from 'date-fns/format';
import { Timestamp } from 'firebase-admin/firestore';
import Link from 'next/link';
import { Route } from '@listic/feature/route';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

export const OfferListPage: PageWithLayout = () => {
  const router = useRouter();
  const { data, isLoading } = useUserOffers();
  const [isPending7Days, setPending7Days] = useState(false);
  const [isPending30Days, setPending30Days] = useState(false);
  const isPending = isPending7Days || isPending30Days;
  const createCheckoutSession = useCreateCheckoutSession();

  useEffect(() => {
    if (router.query.success === 'true') {
      toast.success(
        'Płatność zakończona pomyślnie. Twoja oferta za niedługo zacznie być promowana!'
      );
    } else if (router.query.canceled === 'true') {
      toast('Płatność została anulowana');
    }
  }, [router.query.canceled, router.query.success]);

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

  const renderPromoteSection = (offer: OfferWithId) => {
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
          isLoading={isPending7Days}
          isDisabled={isPending}
          onClick={() => onPromoteClick(offer.id, Product.PROMOTE_7_DAYS)}
        >
          Promuj przez 7 dni
        </Button>
        <Button
          isLoading={isPending30Days}
          isDisabled={isPending}
          onClick={() => onPromoteClick(offer.id, Product.PROMOTE_30_DAYS)}
        >
          Promuj przez 30 dni
        </Button>
      </div>
    );
  };

  const renderOffers = () => {
    return (
      <div className="flex flex-col gap-4">
        {data.map((offer) => (
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
            </div>
            {renderPromoteSection(offer)}
          </div>
        ))}
      </div>
    );
  };

  const renderNoOffers = () => {
    return <div>Brak ofert do wyświetlenia</div>;
  };

  return (
    <div className="flex-1 bg-gray-100">
      <Container className="pt-4">
        {!isLoading && !data.length && renderNoOffers()}
        {!isLoading && !!data.length && renderOffers()}
      </Container>
    </div>
  );
};

OfferListPage.getLayout = getMainLayout;

export default OfferListPage;
