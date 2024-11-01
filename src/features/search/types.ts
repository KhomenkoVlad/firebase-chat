import { ChatCategoryType } from "../chats";

export type SearchItemType = {
  category: ChatCategoryType;
  id: string;
  title: string;
  photoURL: string;
};
