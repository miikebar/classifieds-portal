import { Offer } from '@listic/feature-offer-types';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface SearchData {
  item?: string;
  category?: string;
  location?: Offer['_geoloc'];
}

export interface UseSearchFromProps {
  onQueryChange?(query: string, location?: Offer['_geoloc']): void;
}

export const useSearchForm = ({ onQueryChange }: UseSearchFromProps = {}) => {
  const { handleSubmit, getValues, ...form } = useForm<SearchData>();

  const handleSearch = useCallback(() => {
    const { item = '', category = '', location } = getValues();
    const query = `${item} ${category === 'default' ? '' : category}`.trim();
    onQueryChange?.(query, location);
  }, [getValues, onQueryChange]);

  const handler = useMemo(
    () => handleSubmit(handleSearch),
    [handleSearch, handleSubmit]
  );

  return { handleSubmit: handler, getValues, ...form };
};
