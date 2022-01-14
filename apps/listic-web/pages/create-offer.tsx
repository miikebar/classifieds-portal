import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { CreateOfferForm } from '@listic/feature/offer/create';
import { useAuthGuard } from '@listic/react/utils';
import { Container } from '@listic/ui/container';

const CreateOfferPage: PageWithLayout = () => {
  useAuthGuard();

  return (
    <div className="flex-1 bg-gray-100">
      <Container className="mt-8">
        <CreateOfferForm />
      </Container>
    </div>
  );
};

CreateOfferPage.getLayout = getMainLayout;

export default CreateOfferPage;
