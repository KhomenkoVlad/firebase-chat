import { firestore } from "@/lib/firebase/init";
import { collection, DocumentData, Query, query, where } from "firebase/firestore";

export type QueryReturnType = Query<DocumentData, DocumentData> | null;
export type QueryFunctionType = (search: string) => QueryReturnType;

export const searchUserQuery: QueryFunctionType = (search: string): QueryReturnType => {
  if (!search) return null;

  return query(collection(firestore, "users"), where("name", "==", search));
};

export const searchChatQuery: QueryFunctionType = (search: string): QueryReturnType => {
  if (!search) return null;

  return query(collection(firestore, "chats"), where("title", "==", search));
};
