import { Button } from '@listic/ui/button';
import { SearchIconGroup } from './SearchIconGroup';
import { ReactComponent as IconSearch } from '@listic/ui/icons/search-solid.svg';
import { ReactComponent as IconList } from '@listic/ui/icons/list-solid.svg';
import { ReactComponent as IconMarker } from '@listic/ui/icons/map-marker-alt-solid.svg';
import { categories } from '@listic/core/categories';
import { useSearchForm, UseSearchFromProps } from './useSearchForm';
import { useState } from 'react';

export const Search: React.FC<UseSearchFromProps> = (props) => {
  const [query, setQuery] = useState('');
  const { register, handleSubmit } = useSearchForm(props);

  return (
    <form className="bg-gray-200 rounded-xl p-3" onSubmit={handleSubmit}>
      <div className="flex flex-col bg-white rounded-xl p-4 gap-4 lg:flex-row">
        <SearchIconGroup title="Czego szukasz" icon={<IconSearch />}>
          <input
            className="h-full w-full outline-none"
            placeholder="Wpisz nazwę szukanej rzeczy"
            {...register('item')}
          />
        </SearchIconGroup>
        <SearchIconGroup title="Wybierz kategorię" icon={<IconList />}>
          <select
            defaultValue="default"
            className="w-full lg:mr-2 lg:-ml-1"
            {...register('category')}
          >
            <option value="default" disabled>
              Kategoria szukanego przedmiotu
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </SearchIconGroup>
        <SearchIconGroup title="Gdzie szukasz" icon={<IconMarker />}>
          <input
            className="w-full h-full outline-none"
            placeholder="Lokalizacja"
            {...register('location')}
          />
        </SearchIconGroup>
        <Button type="submit" className="h-14 px-10">
          Szukaj
        </Button>
      </div>
    </form>
  );
};
