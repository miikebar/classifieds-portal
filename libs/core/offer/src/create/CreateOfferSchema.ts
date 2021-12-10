import { categories } from '@listic/core/categories';
import {
  enums,
  Infer,
  nonempty,
  number,
  object,
  size,
  string,
} from 'superstruct';

export const CreateOfferSchema = object({
  name: nonempty(string()),
  category: enums(categories),
  description: nonempty(string()),
  price: size(number(), 0, Infinity),
});

export type CreateOfferData = Infer<typeof CreateOfferSchema>;
