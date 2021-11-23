import { Contacts } from "components/contacts";
import { AppContainer, AppGrid } from "components/layout";
import { Navbar } from "components/navbar";
import styled from "styled-components";

const Title = styled.p`
  font-size: 24px;
  line-height: 1.5;
  text-align: center;
`;

export function EmptyConversation() {
  return (
    <AppContainer>
      <Navbar />
      <AppGrid>
        <Contacts />
        <div>
          <Title>Select a contact to begin a conversation.</Title>
        </div>
      </AppGrid>
    </AppContainer>
  );
}
