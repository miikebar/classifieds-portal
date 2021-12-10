import { OfferSearchIndex } from '@listic/core-search';
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
}

export const useOfferList = ({ query }: UseOfferListProps = {}) => {
  const [data, setData] = useState<OfferSearchIndex[]>([]);

  const fetchOffers = useCallback(async () => {
    const { hits } = await index.search<OfferSearchIndex>(query ?? '');
    setData(hits);
  }, [query]);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  return { data };
};
