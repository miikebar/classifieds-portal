import { OfferSearchIndex } from '@listic/core-search';
import { Offer } from '@listic/feature-offer-types';
import algolia from 'algoliasearch/lite';
import { useCallback, useEffect, useState } from 'react';

const client = algolia(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY as string
);

const index = client.initIndex(
  process.env.NEXT_PUBLIC_ALGOLIA_OFFERS_INDEX as string
);

interface UseOfferListProps {
  query?: string;
  location?: Offer['_geoloc'];
}

export const useOfferList = ({ query, location }: UseOfferListProps = {}) => {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<OfferSearchIndex[]>([]);

  const fetchOffers = useCallback(async () => {
    console.log({ query, location });

    const { hits } = await index.search<OfferSearchIndex>(query ?? '', {
      ...(location && {
        aroundLatLng: `${location.lat}, ${location.lng}`,
      }),
    });
    setData(hits);
    setLoading(false);
  }, [location, query]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return { isLoading, data };
};
