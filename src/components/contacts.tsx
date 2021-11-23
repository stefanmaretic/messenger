import { StateContext } from "app";
import { formatDistance } from "date-fns";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";

const ContactsList = styled.div`
  display: flex;
  flex-direction: column;
  margin: 16px 8px;
  padding-right: 8px;
  gap: 8px;
  max-width: 400px;

  @media (min-width: 640px) {
    border-right: 1px solid ${({ theme }) => theme["gray-200"]};
  }
`;

const Contact = styled.div<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid transparent;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme["gray-100"]};
  }

  ${({ theme, $isActive }) =>
    $isActive &&
    `
      border: 1px solid ${theme["blue-400"]};
      background-color: ${theme["gray-100"]};
    `};
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ContactName = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.25;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme["gray-400"]};
`;

const OnlineActivityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ActivityIndicator = styled.div<{ $isActive: boolean }>(
  ({ $isActive, theme }) => `
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: ${$isActive ? theme["green-400"] : theme["gray-400"]};
`
);

const OnlineStatus = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1;
`;

const LastMessage = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme["gray-600"]};
`;

export function Contacts() {
  const params = useParams();
  const navigate = useNavigate();
  const [state] = useContext(StateContext);
  const conversations = state?.conversations ?? [];
  const contacts = conversations.map((conversation) => ({
    ...conversation.user,
    lastMessage: conversation.messages[conversation.messages.length - 1] ?? "",
  }));

  return (
    <ContactsList>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          onClick={() => navigate(`/${contact.username}`)}
          $isActive={contact.username === params.username}
        >
          <Avatar />
          <ContactInfo>
            <ContactName>{contact.username}</ContactName>
            <OnlineActivityContainer>
              <ActivityIndicator $isActive={contact.isOnline} />
              <OnlineStatus>
                {contact.isOnline
                  ? "online"
                  : contact.lastOnline
                  ? formatDistance(contact.lastOnline, new Date(), {
                      addSuffix: true,
                    })
                  : "long time ago"}
              </OnlineStatus>
            </OnlineActivityContainer>
            {contact.lastMessage && (
              <LastMessage>
                {contact.lastMessage.sender === "owner" ? (
                  <b>Me:</b>
                ) : (
                  <b>{contact.username}:</b>
                )}{" "}
                {contact.lastMessage.text}
              </LastMessage>
            )}
          </ContactInfo>
        </Contact>
      ))}
    </ContactsList>
  );
}
