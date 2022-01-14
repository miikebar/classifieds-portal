import { Offer } from '@listic/feature-offer-types';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface SearchData {
  item?: string;
  category?: string;
  radius?: number | 'all';
  location?: Offer['_geoloc'];
}

export interface UseSearchFromProps {
  onQueryChange?(
    query: string,
    location?: Offer['_geoloc'],
    radius?: number | 'all'
  ): void;
}

export const useSearchForm = ({ onQueryChange }: UseSearchFromProps = {}) => {
  const { handleSubmit, getValues, ...form } = useForm<SearchData>({
    defaultValues: {
      radius: 1,
    },
  });

  const handleSearch = useCallback(() => {
    const { item = '', category = '', location, radius } = getValues();
    const query = `${item} ${category === 'default' ? '' : category}`.trim();
    onQueryChange?.(query, location, radius);
  }, [getValues, onQueryChange]);

  const handler = useMemo(
    () => handleSubmit(handleSearch),
    [handleSearch, handleSubmit]
  );

  return { handleSubmit: handler, getValues, ...form };
};
