import { Offer } from '@listic/feature-offer-types';
import { OfferListItem } from '../item/OfferListItem';
import { useOfferList } from './useOfferList';

interface OfferListProps {
  query?: string;
  radius?: number | 'all';
  location?: Offer['_geoloc'];
}

export const OfferList: React.FC<OfferListProps> = ({
  query,
  location,
  radius,
}) => {
  const { isLoading, data } = useOfferList({ query, location, radius });

  return (
    <div className="flex flex-col gap-4">
      {!isLoading && data.length === 0 && (
        <div className="text-center font-bold">
          Brak ogłoszeń do wyświetlenia
        </div>
      )}
      {data.map((item) => (
        <OfferListItem key={item.objectID} offer={item} />
      ))}
    </div>
  );
};
