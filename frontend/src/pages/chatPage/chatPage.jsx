import { Navbar, PageContainer } from "../../components";
import { Channels } from "./components";
import { ChatContainer } from "./components";
import { Messages } from "./components";
import { SendForm } from "./components";

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
