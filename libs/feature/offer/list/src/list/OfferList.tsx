import { OfferListItem } from '../item/OfferListItem';
import { useOfferList } from './useOfferList';

interface OfferListProps {
  query?: string;
}

export const OfferList: React.FC<OfferListProps> = ({ query }) => {
  const { data } = useOfferList({ query });

  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <OfferListItem key={item.objectID} offer={item} />
      ))}
    </div>
  );
};
