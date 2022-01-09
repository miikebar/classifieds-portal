import { Collection } from '@listic/core-firebase-utils';

interface CheckIfRoomExistsProps {
  offerId: string;
  userId: string;
}

export const findChatID = async ({
  offerId,
  userId,
}: CheckIfRoomExistsProps) => {
  try {
    const [firestoreLite, collection, query, where, getDocs] =
      await Promise.all([
        import('@listic/core/firebase/firestore-lite').then(
          (m) => m.firestoreLite
        ),
        import('firebase/firestore/lite').then((m) => m.collection),
        import('firebase/firestore/lite').then((m) => m.query),
        import('firebase/firestore/lite').then((m) => m.where),
        import('firebase/firestore/lite').then((m) => m.getDocs),
      ]);

    const chatsRef = collection(firestoreLite, Collection.CHATS);
    const chatQuery = query(
      chatsRef,
      where('offerId', '==', offerId),
      where(`members.${userId}.isActive`, '==', true)
    );
    const snapshot = await getDocs(chatQuery);
    return snapshot.empty ? null : snapshot.docs[0].id;
  } catch (error) {
    return null;
  }
};
