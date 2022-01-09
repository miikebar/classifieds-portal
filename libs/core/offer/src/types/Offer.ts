import { CreateOfferData } from '../create/CreateOfferSchema';
import type { UserProfile } from '@listic/core/user';
import type { Timestamp } from 'firebase/firestore';

export type Offer = CreateOfferData & {
  active: boolean;
  slug: string;
  images?: string[];
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
} & {
  owner: UserProfile & { id: string };
};
