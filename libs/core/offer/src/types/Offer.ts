import { CreateOfferData } from '../create/CreateOfferSchema';
import type { UserProfile } from '@listic/core/user';

export type Offer = CreateOfferData & {
  owner: UserProfile & { id: string };
};
