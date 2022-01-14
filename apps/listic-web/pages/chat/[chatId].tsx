import { Chat } from '@listic/feature/chat/ui';
import { getMainLayout, PageWithLayout } from '@listic/feature/layout';
import { useAuthGuard } from '@listic/react/utils';
import { Container } from '@listic/ui/container';
import { useRouter } from 'next/router';

const ChatPage: PageWithLayout = () => {
  useAuthGuard();

  const router = useRouter();
  const chatId = router.query.chatId as string;

  return (
    <Container className="flex-1 py-2">
      <Chat chatId={chatId} />
    </Container>
  );
};

ChatPage.getLayout = getMainLayout;

export default ChatPage;
