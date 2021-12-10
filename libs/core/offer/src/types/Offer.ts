import { CreateOfferData } from '../create/CreateOfferSchema';
import type { UserProfile } from '@listic/core/user';
import { Timestamp } from 'firebase/firestore';

export type Offer = CreateOfferData & {
  active: boolean;
  slug: string;
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
} & {
  owner: UserProfile & { id: string };
};
