import { firestore } from "@/lib/firebase/init";
import { collection, query, where } from "firebase/firestore";

export const allUnreadMessages = (chatId: string) => {
  return query(
    collection(firestore, "messages"),
    where("chatId", "==", chatId),
    where("hasSeen", "==", false)
  );
};
