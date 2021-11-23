import { createContext, Dispatch, useReducer } from "react";
import produce from "immer";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { subMinutes } from "date-fns";
import { baseTheme } from "config/themes/base-theme";
import { GlobalStyles } from "config/themes/global-styles";
import { EmptyConversation } from "pages/empty-conversation";
import "normalize.css";
import { Conversation } from "pages/conversation";

export interface IMessage {
  text: string;
  sender: "particapant" | "owner";
  sentAt: Date;
}

export interface IUser {
  id: number;
  username: string;
  isOnline: boolean;
  lastOnline: Date | null;
}

export interface IConversation {
  user: IUser;
  messages: IMessage[];
}

interface IState {
  conversations: IConversation[];
}

const initialState: IState = {
  conversations: [
    {
      user: {
        id: 0,
        username: "john.doe",
        isOnline: false,
        lastOnline: subMinutes(new Date(), 15),
      },
      messages: [
        {
          text: "hello",
          sender: "particapant",
          sentAt: new Date(),
        },
        { text: "world", sender: "owner", sentAt: new Date() },
      ],
    },
    {
      user: { id: 1, username: "jane.doe", isOnline: true, lastOnline: null },
      messages: [],
    },
  ],
};

export const StateContext = createContext<
  [IState, Dispatch<IAction>] | [null, () => null]
>([null, () => null]);

interface IAction {
  type: ActionTypes;
  payload?: any;
  meta?: any;
}

export enum ActionTypes {
  SendMessage = "send_message",
}

function reducer() {
  return produce((draft: IState, action: IAction) => {
    switch (action.type) {
      case ActionTypes.SendMessage:
        const messages =
          draft.conversations.find(
            (conv) => conv.user.username === action.payload.username
          )?.messages ?? [];
        messages.push({
          text: action.payload.message,
          sender: "owner",
          sentAt: new Date(),
        });
        return;
    }
  });
}

function App() {
  const [state, dispatch] = useReducer(reducer(), initialState);

  return (
    <ThemeProvider theme={baseTheme}>
      <GlobalStyles />
      <StateContext.Provider value={[state, dispatch]}>
        <BrowserRouter>
          <Routes>
            <Route index element={<EmptyConversation />} />
            <Route path="/:username" element={<Conversation />} />
          </Routes>
        </BrowserRouter>
      </StateContext.Provider>
    </ThemeProvider>
  );
}

export default App;
