import { categories } from '@listic/core/categories';
import { Button } from '@listic/ui/button';
import { ReactComponent as IconList } from '@listic/ui/icons/list-solid.svg';
import { ReactComponent as IconMarker } from '@listic/ui/icons/map-marker-alt-solid.svg';
import { ReactComponent as IconSearch } from '@listic/ui/icons/search-solid.svg';
import { LocationInput } from './LocationInput';
import { SearchIconGroup } from './SearchIconGroup';
import { useSearchForm, UseSearchFromProps } from './useSearchForm';

const km2m = (km: number) => km * 1000;

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
          <div className="flex">
            <div className="flex-1">
              <LocationInput
                onPlaceSelect={(place) => setValue('location', place as any)}
              />
            </div>
            <select {...register('radius')}>
              <option value={1}>+0 km</option>
              <option value={km2m(2)}>+2 km</option>
              <option value={km2m(5)}>+5 km</option>
              <option value={km2m(10)}>+10 km</option>
              <option value={km2m(15)}>+15 km</option>
              <option value={km2m(30)}>+30 km</option>
              <option value={km2m(50)}>+50 km</option>
              <option value={km2m(75)}>+75 km</option>
              <option value={km2m(100)}>+100 km</option>
            </select>
          </div>
        </SearchIconGroup>
        <Button type="submit" className="h-14 px-10">
          Szukaj
        </Button>
      </div>
    </form>
  );
};
