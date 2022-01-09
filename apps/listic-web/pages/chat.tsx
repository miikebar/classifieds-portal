import { getMainLayout, PageWithLayout } from '@listic/feature/layout';

const ChatPage: PageWithLayout = () => {
  return <div>Chat</div>;
};

ChatPage.getLayout = getMainLayout;

export default ChatPage;
