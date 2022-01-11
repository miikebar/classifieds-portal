import { ChatList } from '@listic/feature/chat/ui';
import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';

const ChatListPage: PageWithLayout = () => {
  return (
    <div className="flex-1 bg-gray-100">
      <Container className="pt-4">
        <ChatList />
      </Container>
    </div>
  );
};

ChatListPage.getLayout = getMainLayout;

export default ChatListPage;
