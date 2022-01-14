import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { ChatRoom } from '@listic/feature-chat-types';
import { doc, getDoc } from 'firebase/firestore';
import { useCallback, useEffect, useState } from 'react';

interface UseChatDataProps {
  chatId: string;
}

export const useChatData = ({ chatId }: UseChatDataProps) => {
  const [data, setData] = useState<ChatRoom | null>(null);
  const [exists, setExists] = useState(true);

  const fetchChatData = useCallback(async () => {
    try {
      const chatDoc = await getDoc(
        doc(firestore, `${Collection.CHATS}/${chatId}`)
      );
      setData(chatDoc.data() as ChatRoom);
    } catch (error) {
      setExists(false);
    }
  }, [chatId]);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  return { data, exists };
};
