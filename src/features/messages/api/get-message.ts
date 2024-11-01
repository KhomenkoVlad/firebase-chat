import { authSlice } from "@/features/auth";
import { chatSlice } from "@/features/chats";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { haveSeenLastMessage, haveSeenMessage } from "./have-seen-message";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { transformMessage } from "../utils/transformMsg";

export const useGetMessage = (doc: QueryDocumentSnapshot) => {
  const [data, isLoading, error] = useDocumentData(doc.ref);
  if (error) console.error(error);

  const authUserId = useAppSelector(authSlice.selectors.selectUserId);
  const chat = useAppSelector(chatSlice.selectors.selectChat);
  const message = transformMessage(data, authUserId, chat?.users);

  useEffect(() => {
    if (message && !message.isAuthUser && !message.hasSeen) {
      haveSeenMessage(doc);
      haveSeenLastMessage(chat?.id);
    }
  }, [message]);

  return { message, isLoading, error };
};
