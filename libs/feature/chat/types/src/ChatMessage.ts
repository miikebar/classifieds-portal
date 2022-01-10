import type { FieldValue, Timestamp } from 'firebase/firestore';

export interface ChatMessage {
  authorId: string;
  content: string;
  createdAt: Date | Timestamp | FieldValue;
}
