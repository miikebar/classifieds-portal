import { Collection } from '@listic/core-firebase-utils';
import { firestore } from '@listic/core/firebase/firestore';
import { ChatMessage } from '@listic/feature-chat-types';
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface UseChatMessagesProps {
  chatId: string;
  onNewMessage?(): void;
}

interface ChatMessageWithId extends ChatMessage {
  id: string;
  createdAt: Date;
}

const MESSAGES_PER_LOAD = 20;

export const useChatMessages = ({
  chatId,
  onNewMessage,
}: UseChatMessagesProps) => {
  const [isInitialized, setInitialized] = useState(false);
  const [oldestMessageRef, setOldestMessageRef] =
    useState<QueryDocumentSnapshot | null>(null);
  const [newestMessageRef, setNewestMessageRef] = useState<
    QueryDocumentSnapshot | null | undefined
  >();
  const [prevMessages, setPrevMessages] = useState<ChatMessageWithId[]>([]);
  const [newMessages, setNewMessages] = useState<ChatMessageWithId[]>([]);
  const messages = useMemo(
    () => [...prevMessages, ...newMessages],
    [newMessages, prevMessages]
  );
  const hasOlderMessages = !!oldestMessageRef;
  const olderMessagesIdLookup = useRef<Record<string, boolean>>({}).current;

  const mapDocsToMessages = useCallback((docs: QueryDocumentSnapshot[]) => {
    return docs.map((doc) => {
      const data = doc.data({ serverTimestamps: 'estimate' }) as ChatMessage;
      const message: ChatMessageWithId = {
        id: doc.id,
        ...data,
        createdAt: (data.createdAt as Timestamp).toDate(),
      };
      return message;
    });
  }, []);

  const getInitialMessages = useCallback(async () => {
    const msgsQuery = query(
      collection(firestore, `${Collection.CHATS}/${chatId}/messages`),
      orderBy('createdAt', 'desc'),
      limit(MESSAGES_PER_LOAD)
    );

    try {
      const snapshot = await getDocs(msgsQuery);
      const messages = mapDocsToMessages(snapshot.docs).reverse();

      setPrevMessages(messages);
      setNewestMessageRef(snapshot.docs[0] ?? null);
      setOldestMessageRef(snapshot.docs[snapshot.docs.length - 1] ?? null);
      setInitialized(true);
    } catch (error) {
      // Chat does not exist
    }
  }, [chatId, mapDocsToMessages]);

  useEffect(() => {
    getInitialMessages();
  }, [getInitialMessages]);

  const setupNewMessageListener = useCallback(() => {
    if (typeof newestMessageRef === 'undefined') {
      return;
    }

    const constraints = [orderBy('createdAt', 'asc')];

    if (newestMessageRef) {
      constraints.push(startAfter(newestMessageRef));
    }

    const newMsgsQuery = query(
      collection(firestore, `${Collection.CHATS}/${chatId}/messages`),
      ...constraints
    );

    const unsubscribe = onSnapshot(newMsgsQuery, (snapshot) => {
      setNewMessages(mapDocsToMessages(snapshot.docs));
      onNewMessage?.();
    });

    return unsubscribe;
  }, [chatId, mapDocsToMessages, newestMessageRef, onNewMessage]);

  useEffect(() => {
    const unsubscribe = setupNewMessageListener();
    return unsubscribe;
  }, [setupNewMessageListener]);

  const loadOlderMessages = useCallback(async () => {
    if (!oldestMessageRef) {
      return;
    }

    const msgsQuery = query(
      collection(firestore, `${Collection.CHATS}/${chatId}/messages`),
      orderBy('createdAt', 'desc'),
      startAfter(oldestMessageRef),
      limit(MESSAGES_PER_LOAD)
    );

    const snapshot = await getDocs(msgsQuery);
    const msgs = mapDocsToMessages(snapshot.docs)
      .filter((msg) => {
        if (!olderMessagesIdLookup[msg.id]) {
          olderMessagesIdLookup[msg.id] = true;
          return true;
        }
        return false;
      })
      .reverse();

    setPrevMessages((current) => [...msgs, ...current]);
    setOldestMessageRef(snapshot.docs[snapshot.docs.length - 1] ?? null);
  }, [chatId, mapDocsToMessages, olderMessagesIdLookup, oldestMessageRef]);

  return {
    messages,
    isInitialized,
    loadOlderMessages,
    hasOlderMessages,
  };
};
