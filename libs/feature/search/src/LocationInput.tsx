import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete/dist/index';
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Offer } from '@listic/feature-offer-types';

interface LocationInputProps {
  onPlaceSelect(location: Offer['_geoloc'] | null, name: string | null): void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  onPlaceSelect: onPlaceSelectProp,
}) => {
  const onPlaceSelect = (value: any) => {
    console.log(value);

    if (!value) {
      onPlaceSelectProp(null, null);
    } else {
      onPlaceSelectProp(
        {
          lat: value.properties.lat,
          lng: value.properties.lon,
        },
        value.properties.address_line1
      );
    }
  };

  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_KEY}>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore-next-line */}
      <GeoapifyGeocoderAutocomplete
        placeholder="Podaj lokalizację ogłoszenia"
        placeSelect={onPlaceSelect as any}
        lang="pl"
      />
    </GeoapifyContext>
  );
};
