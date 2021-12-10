import { OfferListItem } from '../item/OfferListItem';
import { useOfferList } from './useOfferList';

export const OfferList: React.FC = () => {
  const { data } = useOfferList();

  return (
    <div className="flex flex-col gap-4">
      {data.map((item) => (
        <OfferListItem key={item.objectID} offer={item} />
      ))}
    </div>
  );
};
