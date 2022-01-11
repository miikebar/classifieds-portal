import { categories } from '@listic/core/categories';
import { Button } from '@listic/ui/button';
import { ReactComponent as IconList } from '@listic/ui/icons/list-solid.svg';
import { ReactComponent as IconMarker } from '@listic/ui/icons/map-marker-alt-solid.svg';
import { ReactComponent as IconSearch } from '@listic/ui/icons/search-solid.svg';
import { LocationInput } from './LocationInput';
import { SearchIconGroup } from './SearchIconGroup';
import { useSearchForm, UseSearchFromProps } from './useSearchForm';

export const Search: React.FC<UseSearchFromProps> = (props) => {
  const { register, setValue, handleSubmit } = useSearchForm(props);

  return (
    <form className="bg-gray-200 rounded-xl p-3 search" onSubmit={handleSubmit}>
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
          <LocationInput
            onPlaceSelect={(place) => setValue('location', place as any)}
          />
        </SearchIconGroup>
        <Button type="submit" className="h-14 px-10">
          Szukaj
        </Button>
      </div>
    </form>
  );
};
