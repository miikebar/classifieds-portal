import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Button } from '@listic/ui/button';
import { Card } from '@listic/ui/card';
import { Container } from '@listic/ui/container';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { firestore } from '@listic/core/firebase/admin';
import { Collection } from '@listic/core/firebase';
import { Offer } from '@listic/core/offer';
import { Timestamp } from 'firebase/firestore';
import { format } from 'date-fns';

interface OfferPageProps {
  offer: Omit<Offer, 'createdAt' | 'updatedAt' | 'owner'> & {
    createdAt: string;
    updatedAt: string;
    owner: Omit<Offer['owner'], 'createdAt'> & { createdAt: string };
  };
}

const OfferPage: PageWithLayout<OfferPageProps> = ({ offer }) => {
  return (
    <div className="flex-1 bg-gray-100">
      <Container className="flex flex-col gap-4 mt-8 lg:flex-row ">
        <div className="lg:w-3/4">
          <Card>
            <span className="text-sm text-gray-500 block mb-1">
              Dodano {format(new Date(offer.createdAt), 'dd.MM.yyyy')}
            </span>
            <Card.Header>
              <h2 className="text-3xl mb-3">{offer.name}</h2>
              <span className="font-bold text-4xl text-gray-700">
                {offer.price} zł
              </span>
              <a
                href="#cat"
                className="border self-start py-1 px-2 border-gray-500 rounded-md text-sm mt-2 transition-colors hover:bg-gray-100"
              >
                {offer.category}
              </a>
            </Card.Header>
            <p>{offer.description}</p>
          </Card>
        </div>
        <div className="lg:w-1/4">
          <Card>
            <Card.Header>
              <Card.Title>O sprzedającym</Card.Title>
            </Card.Header>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <span className="font-bold  text-lg">{offer.owner.name}</span>
                <span className="text-sm text-gray-500">
                  Na Listic od 10 grudnia 2021
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  as="a"
                  href={`tel:${offer.owner.phone}`}
                  variant="ghost"
                  className="flex-1"
                  isDisabled={!offer.owner.phone}
                >
                  Zadzwoń
                </Button>
                <Button className="flex-1">Napisz</Button>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

OfferPage.getLayout = getMainLayout;

export const getStaticProps: GetStaticProps<OfferPageProps> = async (ctx) => {
  const [slugParam] = ctx.params.slug as string;
  const [id, slug] = slugParam.split('.');

  const offer = await firestore.collection(Collection.OFFERS).doc(id).get();

  if (!offer.exists) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  const data = offer.data() as Offer;

  return {
    props: {
      offer: {
        ...data,
        owner: {
          ...data.owner,
          createdAt: (data.owner.createdAt as Timestamp).toDate().toJSON(),
        },
        createdAt: (data.createdAt as Timestamp).toDate().toJSON(),
        updatedAt: (data.updatedAt as Timestamp).toDate().toJSON(),
      },
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default OfferPage;
