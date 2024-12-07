import { Navbar, PageContainer } from "../../components";
import { ChatContainer, Channels, Messages, SendForm } from "./components";

export const ChatPage = () => (
  <PageContainer>
    <Navbar />
    <ChatContainer>
      <Channels />
      <Messages>
        <SendForm />
      </Messages>
    </ChatContainer>
  </PageContainer>
);
