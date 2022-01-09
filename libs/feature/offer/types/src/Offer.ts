import type { UserProfile } from '@listic/core-user-types';
import type { Timestamp } from 'firebase/firestore';

export interface Offer {
  name: string;
  category: string;
  description: string;
  price: number;
  isActive: boolean;
  slug: string;
  images?: string[];
  createdAt: Timestamp | Date;
  updatedAt: Timestamp | Date;
  owner: UserProfile & { id: string };
}
