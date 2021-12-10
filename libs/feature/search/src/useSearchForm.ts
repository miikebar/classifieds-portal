import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

interface SearchData {
  item?: string;
  category?: string;
  location?: string;
}

export interface UseSearchFromProps {
  onQueryChange?(query: string): void;
}

export const useSearchForm = ({ onQueryChange }: UseSearchFromProps = {}) => {
  const { handleSubmit, getValues, ...form } = useForm<SearchData>();

  const handleSearch = useCallback(() => {
    const { item = '', category = '', location = '' } = getValues();
    const query = `${item} ${
      category === 'default' ? '' : category
    } ${location}`.trim();
    onQueryChange?.(query);
  }, [getValues, onQueryChange]);

  const handler = useMemo(
    () => handleSubmit(handleSearch),
    [handleSearch, handleSubmit]
  );

  return { handleSubmit: handler, getValues, ...form };
};
