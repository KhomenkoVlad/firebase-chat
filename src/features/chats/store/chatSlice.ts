import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FullChatType } from "../types";

const initialState: {
  chat: FullChatType | null;
  isSelected: boolean;
} = {
  chat: null,
  isSelected: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  selectors: {
    selectChat: state => state.chat,
    selectUsers: state => state.chat?.users,
    selectId: state => state.chat?.id,
    isChatSelected: state => state.isSelected,
  },
  reducers: {
    setChat: (state, action: PayloadAction<FullChatType>) => {
      state.chat = action.payload;
      state.isSelected = true;
    },
    resetChat: state => {
      state.chat = initialState.chat;
      state.isSelected = false;
    },
    updateInfo: (state, action: PayloadAction<{ title: string; photoURL: string }>) => {
      const { title, photoURL } = action.payload;

      if (state.chat) {
        state.chat.title = title;
        state.chat.photoURL = photoURL;
      }
    },
  },
});

export const { setChat, resetChat } = chatSlice.actions;
