import { firestore } from "@/lib/firebase/init";
import {
  QueryDocumentSnapshot,
  collection,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

export const messagesQuery = (chatId?: string, doc?: QueryDocumentSnapshot | "end") => {
  if (doc === "end" || !chatId) return null;

  if (doc) {
    return query(
      collection(firestore, "messages"),
      where("chatId", "==", chatId),
      orderBy("createdAt", "desc"),
      startAfter(doc),
      limit(3)
    );
  } else {
    return query(
      collection(firestore, "messages"),
      where("chatId", "==", chatId),
      orderBy("createdAt", "desc"),
      limit(6)
    );
  }
};

export const firstMessageQuery = (chatId?: string) => {
  if (!chatId) return null;

  return query(
    collection(firestore, "messages"),
    where("chatId", "==", chatId),
    orderBy("createdAt", "desc"),
    limit(1)
  );
};

export const allMessageQuery = (chatId: string) => {
  return query(collection(firestore, "messages"), where("chatId", "==", chatId));
};
