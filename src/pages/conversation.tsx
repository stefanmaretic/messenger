import { ChatFrame } from "components/chat-frame";
import { Contacts } from "components/contacts";
import { AppContainer, AppGrid } from "components/layout";
import { Navbar } from "components/navbar";

export function Conversation() {
  return (
    <AppContainer>
      <Navbar />
      <AppGrid>
        <Contacts />
        <ChatFrame />
      </AppGrid>
    </AppContainer>
  );
}
