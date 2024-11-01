import { firestore } from "@/lib/firebase/init";
import { DocumentReference, FirestoreError, doc } from "firebase/firestore";
import { ChatType, FullChatType } from "../types";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { authSlice, useChatOnline } from "@/features/auth";
import { transformChat } from "../utils/transformChat";
import { getChatUsers } from "./get-chat-users";

export const useChat = (chatId: string) => {
  const chatRef = doc(firestore, "chats", chatId) as DocumentReference<ChatType>;

  const [data, isLoading, error] = useDocumentData(chatRef);
  const [chat, setChat] = useState<FullChatType | null>(null);
  const online = useChatOnline(chat);

  const authUserId = useAppSelector(authSlice.selectors.selectUserId);

  useEffect(() => {
    if (!isLoading && data) {
      getChatUsers(data.users, authUserId).then(users => {
        const chatData = transformChat(data, chatId, users);

        setChat(chatData);
      });
    }
  }, [data]);

  const result: [FullChatType | null, boolean, boolean, FirestoreError | undefined] = [
    chat,
    online,
    isLoading,
    error,
  ];

  return result;
};
