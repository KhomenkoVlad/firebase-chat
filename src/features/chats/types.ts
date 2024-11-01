import { Timestamp } from "firebase/firestore";

export type ChatCategoryType = "personal" | "group";

export type ChatUser = {
  id: string;
  name: string;
  photoURL?: string;
};

export type LastMessageType<T> = {
  userId: string;
  text: string;
  createdAt: T;
  hasSeen: boolean;
};

export type ChatType = {
  title?: string;
  users: string[];
  photoURL?: string;
  lastMessage?: LastMessageType<Timestamp>;
};

export type FullChatType = {
  id: string;
  category: ChatCategoryType;
  title: string;
  users: ChatUser[];
  photoURL?: string;
  lastMessage?: LastMessageType<string>;
};
