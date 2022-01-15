import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { EditOfferForm } from '@listic/feature/offer/edit';
import { Container } from '@listic/ui/container';
import { useRouter } from 'next/router';

export const EditOfferPage: PageWithLayout = () => {
  const router = useRouter();
  const offerId = router.query.id as string;

  return (
    <div className="flex-1 bg-gray-100 test">
      <Container className="pt-4">
        <EditOfferForm offerId={offerId} />
      </Container>
    </div>
  );
};

EditOfferPage.getLayout = getMainLayout;

export default EditOfferPage;
