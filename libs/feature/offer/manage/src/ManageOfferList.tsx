import { useUserOffers } from '@listic/react/offer/list';
import { ManageOfferItem } from './item/ManageOfferItem';

export const ManageOfferList: React.FC = () => {
  const { data, isLoading } = useUserOffers();

  const renderOffers = () => {
    return (
      <div className="flex flex-col gap-4">
        {data.map((offer) => (
          <ManageOfferItem key={offer.id} offer={offer} />
        ))}
      </div>
    );
  };

  const renderNoOffers = () => {
    return <div>Brak ofert do wyświetlenia</div>;
  };

  return (
    <>
      {!isLoading && !data.length && renderNoOffers()}
      {!isLoading && !!data.length && renderOffers()}
    </>
  );
};
