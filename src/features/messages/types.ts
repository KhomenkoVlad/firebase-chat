import { DocumentData, DocumentSnapshot, Timestamp } from "firebase/firestore";
import { ChatUser } from "../chats";

export type MessageType = {
  chatId: string;
  uid: string;
  text: string;
  createdAt: Timestamp;
  hasSeen: boolean;
  image: string | null;
};

export type FullMessageType = {
  id: string;
  chatId: string;
  uid: string;
  text: string;
  createdAt: Timestamp;
  hasSeen: boolean;
  image: string | null;
};

export type DisplayedMessageType = {
  isAuthUser: boolean;
  hasSeen: boolean;
  text: string;
  time: string;
  date: string;
  user: ChatUser;
  image: string | null;
};

export type LastMessagePosition =
  | DocumentSnapshot<DocumentData, DocumentData>
  | "no messages"
  | "end";
