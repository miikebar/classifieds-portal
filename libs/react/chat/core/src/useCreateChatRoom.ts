import { Function } from '@listic/core-firebase-utils';
import {
  CreateChatRoomRequestData,
  CreateChatRoomResponseData,
} from '@listic/feature-chat-types';
import { useFirebaseFunction } from '@listic/react/firebase/functions';

export const useCreateChatRoom = () => {
  return useFirebaseFunction<
    CreateChatRoomRequestData,
    CreateChatRoomResponseData
  >(Function.CHAT.CREATE_ROOM);
};
