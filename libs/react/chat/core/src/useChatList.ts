import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { ChatRoom } from '@listic/feature-chat-types';
import { useAuth } from '@listic/react/auth/core';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface ChatRoomWithId extends ChatRoom {
  id: string;
}

export const useChatList = () => {
  const { uid } = useAuth();
  const [data, setData] = useState<ChatRoomWithId[]>([]);

  const fetchChatRooms = useCallback(() => {
    const roomsQuery = query(
      collection(firestore, Collection.CHATS),
      where(`members.${uid}.isActive`, '==', true)
    );

    const unsubscribe = onSnapshot(roomsQuery, (snapshot) => {
      setData(
        snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as ChatRoomWithId)
        )
      );
    });

    return unsubscribe;
  }, [uid]);

  useEffect(() => {
    fetchChatRooms();
  }, [fetchChatRooms]);

  return { data };
};
