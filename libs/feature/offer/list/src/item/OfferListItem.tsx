import React from 'react';
import { OfferSearchIndex } from '@listic/core-search';
import { Card } from '@listic/ui/card';
import { Route } from '@listic/feature/route';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

interface OfferListItemProps {
  offer: OfferSearchIndex;
}

export const OfferListItem: React.FC<OfferListItemProps> = ({ offer }) => {
  return (
    <Link passHref href={`${Route.OFFER.VIEW}/${offer.objectID}.${offer.slug}`}>
      <Card as="a">
        <div className="flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="font-bold text-lg">{offer.name}</span>
            <span className="font-bold text-gray-700">{offer.price} zł</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">
              {formatDistanceToNow(new Date(offer.createdAt * 1000), {
                locale: pl,
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
};
