import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { firestore } from "@/lib/firebase/init";
import { deleteAllMessages } from "@/features/messages";
import { ChatType } from "../types";
import { deleteChatFromUsers } from "@/features/auth";

export const deleteChat = async (chatId: string) => {
  const chatRef = doc(firestore, "chats", chatId);
  const chat = (await getDoc(chatRef)).data() as ChatType | undefined;

  if (chat === undefined) return;

  await Promise.all([deleteAllMessages(chatId), deleteChatFromUsers(chatId, chat.users)]);
  await deleteDoc(doc(firestore, "chats", chatId));
};
