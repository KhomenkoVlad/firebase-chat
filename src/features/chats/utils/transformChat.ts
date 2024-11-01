import { ChatCategoryType, ChatType, ChatUser, LastMessageType } from "@/features/chats";
import { Timestamp } from "firebase/firestore";

export const transformChat = (data: ChatType, chatId: string, users: ChatUser[]) => {
  const category: ChatCategoryType = data.title ? "group" : "personal";
  const title = data.title ? data.title : users.map((user: ChatUser) => user.name).join(", ");

  return {
    id: chatId,
    category: category,
    title: title,
    users: users,
    photoURL: getPhoto(users, data.photoURL),
    lastMessage: transformLastMessage(data.lastMessage),
  };
};

export const transformLastMessage = (lastMessage?: LastMessageType<Timestamp>) => {
  if (lastMessage) {
    return {
      ...lastMessage,
      createdAt: lastMessage.createdAt.toDate().toString() ?? "no timestamp",
    };
  } else {
    return undefined;
  }
};

const getPhoto = (users: ChatUser[], photoURL?: string) => {
  if (photoURL === "") {
    return users.length > 1 ? undefined : users[0].photoURL;
  } else {
    return photoURL;
  }
};
