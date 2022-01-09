import { ChatRoomMember } from './ChatRoomMember';

export interface ChatRoom {
  offerId: string;
  offerTitle: string;
  isActive: boolean;
  members: Record<string, ChatRoomMember>;
}
