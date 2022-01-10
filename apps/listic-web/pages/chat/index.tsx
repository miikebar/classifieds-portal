import { getMainLayout, PageWithLayout } from '@listic/feature/layout';

const ChatListPage: PageWithLayout = () => {
  return <div>Chat</div>;
};

ChatListPage.getLayout = getMainLayout;

export default ChatListPage;
