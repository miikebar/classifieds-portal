import { Collection } from '@listic/core-firebase-utils';
import { adminFirestore } from '@listic/core/firebase/admin';
import { useOfferStatusManager } from '@listic/core/offer';
import type { Offer } from '@listic/feature-offer-types';
import { findChatID } from '@listic/feature/chat/utils';
import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Route } from '@listic/feature/route';
import { useAuth } from '@listic/react/auth/core';
import { useCreateChatRoom } from '@listic/react/chat/core';
import { Button } from '@listic/ui/button';
import { Card } from '@listic/ui/card';
import { Container } from '@listic/ui/container';
import { format } from 'date-fns';
import type { Timestamp } from 'firebase/firestore';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Skeleton from 'react-loading-skeleton';

interface OfferPageProps {
  offer: Omit<Offer, 'createdAt' | 'updatedAt' | 'owner'> & {
    id: string;
    createdAt: string;
    updatedAt: string;
    owner: Omit<Offer['owner'], 'createdAt'> & { createdAt: string };
  };
}

const OfferPage: PageWithLayout<OfferPageProps> = ({ offer }) => {
  const isLoading = !offer;
  const { uid, isAuthenticated } = useAuth();
  const router = useRouter();
  const { isPending, setActive } = useOfferStatusManager(offer?.id);
  const createChatRoom = useCreateChatRoom();
  const [isChatPending, setChatPending] = useState(false);

  const onChangeStatus = async () => {
    await setActive(!offer?.isActive);
    toast.success('Status ogłoszenia został zaktualizowany');
    router.push(Route.LANDING_PAGE);
  };

  const onChatClick = async () => {
    if (!isAuthenticated) {
      return router.push(Route.AUTH.SIGN_IN);
    }

    setChatPending(true);
    let chatId = await findChatID({
      offerId: offer?.id,
      userId: uid,
    });

    if (!chatId) {
      const chatRoom = await createChatRoom({
        userId: uid,
        offerId: offer?.id,
      });
      chatId = chatRoom.data.id;
    }

    router.push(`${Route.CHAT}/${chatId}`);
  };

  const renderSellerInfo = () => {
    return (
      <Card>
        <Card.Header>
          <Card.Title>O sprzedającym</Card.Title>
        </Card.Header>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <span className="font-bold  text-lg">
              {offer?.owner.name ?? <Skeleton />}
            </span>
            <span className="text-sm text-gray-500">
              {!isLoading ? (
                `Na Listic od ${offer.owner.createdAt}`
              ) : (
                <Skeleton />
              )}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              as="a"
              href={`tel:${offer?.owner.phone}`}
              variant="ghost"
              className="flex-1"
              isDisabled={!offer?.owner.phone}
            >
              Zadzwoń
            </Button>
            <Button
              isDisabled={isLoading}
              isLoading={isChatPending}
              className="flex-1"
              onClick={onChatClick}
            >
              Napisz
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  const renderOfferManagement = () => {
    return (
      <Card>
        <Card.Header>
          <Card.Title>Zarządzaj ogłoszeniem</Card.Title>
        </Card.Header>
        <p className="mb-8">
          Możesz w każdej chwili edytować swoje ogłoszenie, a także zmienić jego
          status
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" className="flex-1">
            Edytuj
          </Button>
          <Button
            isLoading={isPending}
            className="flex-1"
            onClick={onChangeStatus}
          >
            {offer?.isActive ? 'Zakończ' : 'Przywróć'}
          </Button>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex-1 bg-gray-100">
      <Container className="flex flex-col gap-4 mt-8 lg:flex-row ">
        <div className="flex flex-col gap-4 lg:w-3/4">
          {!isLoading && !offer.isActive && (
            <Card className="bg-amber-400">
              Ta oferta została zakończona przez sprzedawcę
            </Card>
          )}
          {(!!offer?.images?.length || isLoading) && (
            <Card>
              <div className="aspect-video rounded-md overflow-hidden shadow-md">
                {isLoading ? (
                  <Skeleton width="100%" height="100%" />
                ) : (
                  <img
                    src={offer?.images[0]}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </Card>
          )}
          <Card>
            <span className="text-sm text-gray-500 block mb-1">
              {offer ? `Dodano ${offer.createdAt}` : <Skeleton width="200px" />}
            </span>
            <Card.Header>
              <h2 className="text-3xl mb-3">{offer?.name}</h2>
              <span className="font-bold text-4xl text-gray-700">
                {!isLoading ? `${offer.price} zł` : <Skeleton width="100px" />}
              </span>
              {!isLoading ? (
                <a
                  href="#cat"
                  className="border self-start py-1 px-2 border-gray-500 rounded-md text-sm mt-2 transition-colors hover:bg-gray-100"
                >
                  {offer?.category}
                </a>
              ) : (
                <Skeleton width="80px" />
              )}
            </Card.Header>
            <p>{offer?.description ?? <Skeleton count={10} />}</p>
          </Card>
        </div>
        <div className="lg:w-1/4">
          {(isLoading || uid) !== offer?.owner.id && renderSellerInfo()}
          {!isLoading && uid === offer?.owner.id && renderOfferManagement()}
        </div>
      </Container>
    </div>
  );
};

OfferPage.getLayout = getMainLayout;

export const getStaticProps: GetStaticProps<OfferPageProps> = async (ctx) => {
  const [slugParam] = ctx.params.slug as string;
  const [id, slug] = slugParam.split('.');

  const offer = await adminFirestore
    .collection(Collection.OFFERS)
    .doc(id)
    .get();

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
        id,
        ...data,
        owner: {
          ...data.owner,
          createdAt: format(
            (data.owner.createdAt as Timestamp).toDate(),
            'dd.MM.yyyy'
          ),
        },
        createdAt: format((data.createdAt as Timestamp).toDate(), 'dd.MM.yyyy'),
        updatedAt: format((data.updatedAt as Timestamp).toDate(), 'dd.MM.yyyy'),
      },
    },
    revalidate: 30,
  };
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default OfferPage;
