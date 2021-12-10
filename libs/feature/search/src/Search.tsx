import { Button } from '@listic/ui/button';
import { SearchIconGroup } from './SearchIconGroup';
import { ReactComponent as IconSearch } from '@listic/ui/icons/search-solid.svg';
import { ReactComponent as IconList } from '@listic/ui/icons/list-solid.svg';
import { ReactComponent as IconMarker } from '@listic/ui/icons/map-marker-alt-solid.svg';
import { categories } from '@listic/core/categories';

export const Search: React.FC = () => {
  return (
    <div className="bg-gray-200 rounded-xl p-3">
      <div className="flex flex-col bg-white rounded-xl p-4 gap-4 lg:flex-row">
        <SearchIconGroup title="Czego szukasz" icon={<IconSearch />}>
          <input
            className="h-full w-full outline-none"
            placeholder="Wpisz nazwę szukanej rzeczy"
          />
        </SearchIconGroup>
        <SearchIconGroup title="Wybierz kategorię" icon={<IconList />}>
          <select defaultValue="default" className="w-full lg:mr-2 lg:-ml-1">
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
          />
        </SearchIconGroup>

        <Button className="h-14 px-10">Szukaj</Button>
      </div>
    </div>
  );
};
