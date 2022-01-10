import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { ChatMessage } from '@listic/feature-chat-types';
import { useAuth } from '@listic/react/auth/core';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useCallback, useState } from 'react';
import { useChatData } from './useChatData';
import { useChatMessages } from './useChatMessages';

interface UseChatProps {
  chatId: string;
  onError?(error: Error): void;
  onNewMessage?(): void;
}

export const useChat = ({ chatId, onError, onNewMessage }: UseChatProps) => {
  const { uid } = useAuth();
  const [isPending, setPending] = useState(false);
  const chatMessages = useChatMessages({ chatId, onNewMessage });
  const chatData = useChatData({ chatId });

  const sendMessage = useCallback(
    async (content: string) => {
      try {
        if (!uid) throw new Error('Not authenticated');
        setPending(true);

        const message: ChatMessage = {
          authorId: uid,
          content,
          createdAt: serverTimestamp(),
        };
        await addDoc(
          collection(firestore, `${Collection.CHATS}/${chatId}/messages`),
          message
        );
      } catch (error) {
        console.error(error);
        onError?.(error as Error);
      } finally {
        setPending(false);
      }
    },
    [chatId, onError, uid]
  );

  return { isPending, sendMessage, chat: chatData.data, ...chatMessages };
};
