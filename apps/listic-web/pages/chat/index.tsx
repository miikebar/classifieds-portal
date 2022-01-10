import { ChatList } from '@listic/feature/chat/ui';
import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { Container } from '@listic/ui/container';

const ChatListPage: PageWithLayout = () => {
  return (
    <Container className="pt-4">
      <ChatList />
    </Container>
  );
};

ChatListPage.getLayout = getMainLayout;

export default ChatListPage;
