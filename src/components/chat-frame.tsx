import { ActionTypes, StateContext } from "app";
import { format } from "date-fns";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import styled, { css } from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: space-between;
  margin: 16px 8px;
`;

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const ownerCss = css`
  margin-left: auto;
  background-color: ${(props) => props.theme["blue-400"]};
`;

const participantCss = css`
  margin-right: auto;
  background-color: ${(props) => props.theme["green-400"]};
`;

const MessageBox = styled.div<{ $isOwners: boolean }>`
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  color: white;
  cursor: pointer;

  ${(props) => (props.$isOwners ? ownerCss : participantCss)}
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 14px;
`;

const MessageTimestamp = styled(motion.p)`
  margin: 0;
  font-size: 10px;
  line-height: 1.5;
  color: ${({ theme }) => theme["gray-200"]};
`;

const InputForm = styled.form`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  bottom: 8px;
  width: calc(100% - 16px);
  margin: 0 auto;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme["gray-100"]};
  border-radius: 6px;
  margin-top: 8px;

  @media (min-width: 640px) {
    width: calc(100% - 400px - 16px);
    left: auto;
    right: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  border: none;
`;

const SendButton = styled.button(
  ({ theme }) => `
  padding: 0 16px;
  border: none;
  background-color: ${theme["blue-400"]};
  border: 1px solid ${theme["blue-400"]};
  color: white;
  font-weight: bold;
  cursor: pointer;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
`
);

export function ChatFrame() {
  const params = useParams();
  const [state, dispatch] = useContext(StateContext);
  const conversations = state?.conversations ?? [];
  const [inputValue, setInputValue] = useState("");
  const messages =
    conversations.find((c) => c.user.username === params.username)?.messages ??
    [];

  const [displayTimestampIndex, setDisplayTimestampIndex] = useState<
    number | null
  >(null);

  function onChange(evt: React.FormEvent<HTMLInputElement>) {
    setInputValue(evt.currentTarget.value);
  }

  function onSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (inputValue) {
      dispatch({
        type: ActionTypes.SendMessage,
        payload: { username: params.username, message: inputValue },
      });
      setInputValue("");
    }
  }

  function onToggleTimestamp(idx: number) {
    if (displayTimestampIndex === idx) {
      setDisplayTimestampIndex(null);
    } else {
      setDisplayTimestampIndex(idx);
    }
  }

  return (
    <ChatContainer>
      <ChatBox>
        {messages.map((message, idx) => (
          <MessageBox
            key={message.text}
            $isOwners={message.sender === "owner"}
            onClick={() => onToggleTimestamp(idx)}
          >
            <MessageText>{message.text}</MessageText>
            <MessageTimestamp
              initial="hidden"
              variants={{
                hidden: {
                  height: 0,
                  opacity: 0,
                  transition: {
                    height: {
                      delay: 0.2,
                    },
                  },
                },
                visible: {
                  height: "auto",
                  opacity: 1,
                  transition: {
                    opacity: {
                      delay: 0.2,
                    },
                  },
                },
              }}
              animate={
                idx + 1 === messages.length || idx === displayTimestampIndex
                  ? "visible"
                  : "hidden"
              }
            >
              {format(message.sentAt, "hh:mm")}
            </MessageTimestamp>
          </MessageBox>
        ))}
      </ChatBox>
      <InputForm onSubmit={onSubmit}>
        <Input value={inputValue} onChange={onChange} />
        <SendButton type="submit">Send</SendButton>
      </InputForm>
    </ChatContainer>
  );
}
