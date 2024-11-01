import { ChatType, ChatUser, FullChatType } from "@/features/chats";
import { DisplayedMessageType, FullMessageType, MessageType } from "@/features/messages";
import { Timestamp } from "firebase/firestore";
import { UserType } from "@/features/auth";
import moment from "moment";

const timestamp = Timestamp.now();
const createdAt = timestamp.toDate().toString();
const time = moment(timestamp.toMillis()).format("HH:mm");
const date = moment(timestamp.toMillis()).format("DD MMMM YYYY");

////////////////////////////////////////////// users ///////////////////

export const users: UserType[] = [
  {
    id: "user-id-1",
    email: "test1@test.com",
    name: "user-name-1",
    photoURL: "user-photo-1",
    chats: ["chat-id-1", "chat-id-3", "chat-id-4"],
  },
  {
    id: "user-id-2",
    email: "test2@test.com",
    name: "user-name-2",
    photoURL: "",
    chats: ["chat-id-1", "chat-id-2", "chat-id-4"],
  },
  {
    id: "user-id-3",
    email: "test3@test.com",
    name: "user-name-3",
    photoURL: "",
    chats: ["chat-id-2", "chat-id-3", "chat-id-4"],
  },
];

export const chatUsers: ChatUser[] = [
  {
    id: "user-id-1",
    name: "user-name-1",
    photoURL: "user-photo-1",
  },
  {
    id: "user-id-2",
    name: "user-name-2",
    photoURL: "",
  },
  {
    id: "user-id-3",
    name: "user-name-3",
    photoURL: "",
  },
];

////////////////////////////////////////////// chats ///////////////////

export const chats: ChatType[] = [
  {
    title: "",
    users: ["user-name-1", "user-name-2"],
    photoURL: "chat-photo-1",
    lastMessage: {
      userId: "user-id-1",
      text: "message-text-1",
      createdAt: timestamp,
      hasSeen: true,
    },
  },
  {
    title: "chat-title-2",
    users: ["user-name-2", "user-name-3"],
    photoURL: "chat-photo-2",
    lastMessage: {
      userId: "user-id-2",
      text: "message-text-2",
      createdAt: timestamp,
      hasSeen: false,
    },
  },
  {
    title: "",
    users: ["user-name-1", "user-name-3"],
    photoURL: "chat-photo-3",
    lastMessage: undefined,
  },
  {
    title: "chat-title-4",
    users: ["user-name-1", "user-name-2", "user-name-3"],
    photoURL: "chat-photo-4",
    lastMessage: {
      userId: "user-id-3",
      text: "message-text-4",
      createdAt: timestamp,
      hasSeen: true,
    },
  },
];

export const fullChats: FullChatType[] = [
  {
    id: "chat-id-1",
    category: "personal",
    title: "user-name-1, user-name-2",
    users: [chatUsers[0], chatUsers[1]],
    photoURL: "chat-photo-1",
    lastMessage: {
      userId: "user-id-1",
      text: "message-text-1",
      createdAt: createdAt,
      hasSeen: true,
    },
  },
  {
    id: "chat-id-2",
    category: "group",
    title: "chat-title-2",
    users: [chatUsers[1], chatUsers[2]],
    photoURL: "chat-photo-2",
    lastMessage: {
      userId: "user-id-2",
      text: "message-text-2",
      createdAt: createdAt,
      hasSeen: false,
    },
  },
  {
    id: "chat-id-3",
    category: "personal",
    title: "user-name-1, user-name-3",
    users: [chatUsers[0], chatUsers[2]],
    photoURL: "chat-photo-3",
    lastMessage: undefined,
  },
  {
    id: "chat-id-4",
    category: "group",
    title: "chat-title-4",
    users: [chatUsers[0], chatUsers[1], chatUsers[2]],
    photoURL: "chat-photo-4",
    lastMessage: {
      userId: "user-id-3",
      text: "message-text-4",
      createdAt: createdAt,
      hasSeen: true,
    },
  },
];

////////////////////////////////////////////// messages ///////////////////

export const messages: MessageType[] = [
  {
    chatId: "chat-id-1",
    uid: "user-id-1",
    text: "message-text-1",
    createdAt: timestamp,
    hasSeen: true,
    image: "message-image-1",
  },
  {
    chatId: "chat-id-2",
    uid: "user-id-2",
    text: "message-text-2",
    createdAt: timestamp,
    hasSeen: false,
    image: null,
  },
  {
    chatId: "chat-id-4",
    uid: "user-id-3",
    text: "message-text-4",
    createdAt: timestamp,
    hasSeen: true,
    image: null,
  },
];

export const fullMessages: FullMessageType[] = [
  {
    id: "message-id-1",
    chatId: "chat-id-1",
    uid: "user-id-1",
    text: "message-text-1",
    createdAt: timestamp,
    hasSeen: true,
    image: "message-image-1",
  },
  {
    id: "message-id-2",
    chatId: "chat-id-2",
    uid: "user-id-2",
    text: "message-text-2",
    createdAt: timestamp,
    hasSeen: false,
    image: null,
  },
  {
    id: "message-id-4",
    chatId: "chat-id-4",
    uid: "user-id-3",
    text: "message-text-4",
    createdAt: timestamp,
    hasSeen: true,
    image: null,
  },
];

export const displayedMessages: DisplayedMessageType[] = [
  {
    isAuthUser: true,
    hasSeen: true,
    text: "message-text-1",
    time: time,
    date: date,
    user: chatUsers[0],
    image: "message-image-1",
  },
  {
    isAuthUser: false,
    hasSeen: false,
    text: "message-text-2",
    time: time,
    date: date,
    user: chatUsers[1],
    image: null,
  },
  {
    isAuthUser: false,
    hasSeen: true,
    text: "message-text-4",
    time: time,
    date: date,
    user: chatUsers[2],
    image: null,
  },
];
