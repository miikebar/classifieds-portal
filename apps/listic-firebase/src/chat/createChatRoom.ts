import * as functions from 'firebase-functions';
import { Collection, Region } from '@listic/core-firebase-utils';
import {
  ChatRoom,
  CreateChatRoomRequestData,
  CreateChatRoomResponseData,
} from '@listic/feature-chat-types';
import { authGuard } from '../utils/authGuard';
import { admin } from '../lib/firebase';
import { Offer } from '@listic/feature-offer-types';
import { UserProfile } from '@listic/core-user-types';

export const createChatRoom = functions
  .region(Region.DEFAULT)
  .https.onCall(
    async (
      { offerId, userId }: CreateChatRoomRequestData,
      ctx
    ): Promise<CreateChatRoomResponseData> => {
      authGuard(ctx);

      const offer = (
        await admin.firestore().collection(Collection.OFFERS).doc(offerId).get()
      ).data() as Offer;
      const user = (
        await admin.firestore().collection(Collection.USERS).doc(userId).get()
      ).data() as UserProfile;

      const chatRoom: ChatRoom = {
        offerId,
        offerTitle: offer.name,
        isActive: true,
        members: {
          [userId]: {
            isActive: true,
            username: `${user.name} ${user.surname}`,
          },
          [offer.owner.id]: {
            isActive: true,
            username: `${offer.owner.name} ${offer.owner.surname}`,
          },
        },
      };

      const result = await admin
        .firestore()
        .collection(Collection.CHATS)
        .add(chatRoom);
      return { id: result.id, ...chatRoom };
    }
  );
