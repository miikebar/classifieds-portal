import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';
import { useUserOffers } from '@listic/react/offer/list';
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
  const { data } = useUserOffers();
  const [isPending, setPending] = useState(false);
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

  return (
    <Container className="pt-3">
      <div className="flex flex-col gap-4">
        {data.map((offer) => (
          <div
            key={offer.id}
            className="border p-4 rounded-md shadow-sm flex flex-col gap-4 md:flex-row md:justify-between md:items-center"
          >
            <div className="flex flex-col">
              <Link passHref href={`${Route.OFFER.VIEW}/${offer.id}`}>
                <a className="text-xl font-bold">{offer.name}</a>
              </Link>
              <span className="text-gray-500">
                {format((offer.createdAt as Timestamp).toDate(), 'dd.MM.yyyy')}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                isLoading={isPending}
                onClick={() => onPromoteClick(offer.id, Product.PROMOTE_7_DAYS)}
              >
                Promuj przez 7 dni
              </Button>
              <Button
                isLoading={isPending}
                onClick={() =>
                  onPromoteClick(offer.id, Product.PROMOTE_30_DAYS)
                }
              >
                Promuj przez 30 dni
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

OfferListPage.getLayout = getMainLayout;

export default OfferListPage;
