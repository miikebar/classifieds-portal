import { ChatRoom } from '@listic/feature-chat-types';
import { Route } from '@listic/feature/route';
import { useAuth } from '@listic/react/auth/core';
import { useChatList } from '@listic/react/chat/core';
import Link from 'next/link';

export const ChatList: React.FC = () => {
  const { uid } = useAuth();
  const { data } = useChatList();

  const getOtherUser = (room: ChatRoom) => {
    const result = Object.entries(room.members).find(([id]) => id !== uid);
    return result?.[1].username ?? '';
  };

  return (
    <div className="flex flex-col gap-4">
      {data.map((room) => (
        <Link passHref href={`${Route.CHAT}/${room.id}`}>
          <a
            key={room.id}
            className="flex flex-col shadow-sm p-6 rounded-md border transition-shadow hover:shadow-md"
          >
            <span className="text-xl font-bold mb-2">{room.offerTitle}</span>
            <span className="text-gray-500">
              Czat z użytkownikiem {getOtherUser(room)}
            </span>
          </a>
        </Link>
      ))}
    </div>
  );
};
