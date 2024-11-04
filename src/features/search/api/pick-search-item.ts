import { chatSlice } from "@/features/chats";
import { joinToGroup } from "./join-to-group";
import { SearchItemType } from "../types";
import { createChat } from "./create-chat";
import { AppDispatch } from "@/store";
import { authSlice } from "@/features/auth";
import { searchSlice } from "../store";

export const pickSearchItem = async (
  data: SearchItemType,
  dispatch: AppDispatch,
  authUserId?: string
) => {
  let chat;

  switch (data.category) {
    case "personal": {
      chat = await createChat(data.id, authUserId);
      break;
    }
    case "group": {
      chat = await joinToGroup(data, authUserId);
      break;
    }
    default: {
      throw Error("It should not to be here");
    }
  }

  if (chat) {
    dispatch(chatSlice.actions.setChat(chat));
    dispatch(authSlice.actions.addChat(chat.id));
    dispatch(searchSlice.actions.reset());
    document.dispatchEvent(new CustomEvent("resetsearch"));
  }
};
