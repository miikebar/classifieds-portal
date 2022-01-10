import { format } from 'date-fns';
import React from 'react';

interface ChatMessageProps {
  content: string;
  createdAt: Date;
  isAuthor: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  createdAt,
  isAuthor,
}) => {
  return (
    <div className={isAuthor ? 'self-end text-right' : 'self-start text-left'}>
      <div
        className={`p-2 rounded-md ${
          isAuthor ? 'bg-amber-100' : 'bg-gray-300'
        }`}
      >
        {content}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        {format(createdAt, 'dd.MM.yyyy HH:ss')}
      </div>
    </div>
  );
};
