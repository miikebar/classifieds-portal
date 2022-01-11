import React from 'react';
import { OfferSearchIndex } from '@listic/core-search';
import { Card } from '@listic/ui/card';
import { Route } from '@listic/feature/route';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';
import { ReactComponent as IconCamera } from '@listic/ui/icons/camera-solid.svg';

interface OfferListItemProps {
  offer: OfferSearchIndex;
}

export const OfferListItem: React.FC<OfferListItemProps> = ({ offer }) => {
  return (
    <Link passHref href={`${Route.OFFER.VIEW}/${offer.objectID}.${offer.slug}`}>
      <Card as="a" className="lg:p-6">
        <div className="flex gap-6 h-full">
          <div className="aspect-square bg-gray-100 h-32 rounded-md overflow-hidden grid place-content-center">
            {!!offer.images?.length && (
              <img
                src={offer.images[0]}
                className="w-full h-full object-cover"
              />
            )}
            {!offer.images?.length && (
              <div className="w-16 h-16 text-gray-300">
                <IconCamera />
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div className="flex justify-between">
              <span className="font-bold text-lg">{offer.name}</span>
              <span className="font-bold text-gray-700">{offer.price} zł</span>
            </div>
            <div className="flex justify-between items-end">
              <span className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(offer.createdAt * 1000), {
                  locale: pl,
                  addSuffix: true,
                })}
              </span>
              {offer.isPromoted && (
                <span className="bg-blue-400 text-white p-2 rounded-md text-sm">
                  Oferta promowana
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};
