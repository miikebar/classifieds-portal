import { Timestamp } from 'firebase/firestore';

export interface UserProfile {
  name: string;
  surname: string;
  phone?: string;
  createdAt: Timestamp | Date;
}
