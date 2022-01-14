import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { ManageOfferList } from '@listic/feature/offer/manage';
import { useAuthGuard } from '@listic/react/utils';
import { Container } from '@listic/ui/container';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

export const OfferListPage: PageWithLayout = () => {
  useAuthGuard();
  const router = useRouter();

  useEffect(() => {
    if (router.query.success === 'true') {
      toast.success(
        'Płatność zakończona pomyślnie. Twoja oferta za niedługo zacznie być promowana!'
      );
    } else if (router.query.canceled === 'true') {
      toast('Płatność została anulowana');
    }
  }, [router.query.canceled, router.query.success]);

  return (
    <div className="flex-1 bg-gray-100">
      <Container className="pt-4">
        <ManageOfferList />
      </Container>
    </div>
  );
};

OfferListPage.getLayout = getMainLayout;

export default OfferListPage;
