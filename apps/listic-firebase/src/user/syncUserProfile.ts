import { Collection, Region } from '@listic/core-firebase-utils';
import { UserProfile } from '@listic/core-user-types';
import * as functions from 'firebase-functions';
import { admin } from '../lib/firebase';

export const syncUserProfile = functions
  .region(Region.DEFAULT)
  .firestore.document(`${Collection.USERS}/{uid}`)
  .onWrite(async (change, ctx) => {
    if (!change.after.exists) {
      return;
    }

    const userId = ctx.params.uid;
    const user = change.after.data() as UserProfile;

    await Promise.all([
      updateUserChats(userId, user),
      updateUserOffers(userId, user),
    ]);
  });

const updateUserOffers = async (userId: string, user: UserProfile) => {
  const offers = await admin
    .firestore()
    .collection(Collection.OFFERS)
    .where('owner.id', '==', userId)
    .get();

  const updates = offers.docs.map((doc) => {
    return doc.ref.update({
      'owner.name': user.name,
      'owner.surname': user.surname,
      'owner.phone': user.phone,
    });
  });

  return updates;
};

const updateUserChats = async (userId: string, user: UserProfile) => {
  const chats = await admin
    .firestore()
    .collection(Collection.CHATS)
    .where(`members.${userId}.isActive`, '==', true)
    .get();

  const updates = chats.docs.map((doc) => {
    return doc.ref.update({
      [`members.${userId}.username`]: `${user.name} ${user.surname}`,
    });
  });

  return updates;
};
