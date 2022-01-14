import { Route } from '@listic/feature/route';
import { useAuth } from '@listic/react/auth/core';
import { useChat } from '@listic/react/chat/core';
import throttle from 'lodash.throttle';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { ChatInput } from './input/ChatInput';
import { ChatMessage } from './message/ChatMessage';

interface ChatProps {
  chatId: string;
}

const INPUT_NAME = 'message';

export const Chat: React.FC<ChatProps> = ({ chatId }) => {
  const router = useRouter();
  const { uid } = useAuth();
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const handleError = useCallback(
    () => toast.error('Podczas wysyłania wiadomości wystąpił błąd'),
    []
  );

  const scrollMessagesToBottom = useCallback(() => {
    console.log('scroll');
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, []);

  const {
    isInitialized,
    messages,
    chat,
    hasOlderMessages,
    chatExists,
    sendMessage,
    loadOlderMessages,
  } = useChat({
    chatId,
    onError: handleError,
    onNewMessage: scrollMessagesToBottom,
  });

  useEffect(() => {
    if (!chatExists) {
      router.push('/404');
    }
  }, [chatExists, router]);

  const onSubmit = useCallback(
    async (message: string) => {
      await sendMessage(message);
      // scrollMessagesToBottom();
    },
    [sendMessage]
  );

  useEffect(() => {
    if (!messageListRef.current) {
      return;
    }

    const ref = messageListRef.current;
    const loadTreshold = 50;

    const listener = () => {
      if (ref.scrollTop < loadTreshold && hasOlderMessages) {
        loadOlderMessages();
        ref.scrollTop += loadTreshold * 2;
      }
    };
    const throttled = throttle(listener, 200);
    ref.addEventListener('scroll', throttled, { passive: true });

    return () => {
      ref.removeEventListener('scroll', throttled);
    };
  }, [hasOlderMessages, loadOlderMessages]);

  useEffect(() => {
    if (isInitialized) {
      scrollMessagesToBottom();
    }
  }, [isInitialized, scrollMessagesToBottom]);

  return (
    <div className="flex flex-col h-chat">
      <div className="border p-4 text-lg font-bold rounded-tl-lg rounded-tr-lg">
        <Link passHref href={`${Route.OFFER.VIEW}/${chat?.offerId}`}>
          <a>{chat?.offerTitle}</a>
        </Link>
      </div>
      <div
        ref={messageListRef}
        className="flex-1 flex flex-col gap-2 px-4 py-2 overflow-y-scroll bg-gray-100"
      >
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            isAuthor={message.authorId === uid}
            content={message.content}
            createdAt={message.createdAt}
          />
        ))}
      </div>
      <ChatInput onSubmit={onSubmit} />
    </div>
  );
};
