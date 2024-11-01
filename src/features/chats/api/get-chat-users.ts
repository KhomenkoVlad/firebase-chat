import { firestore } from "@/lib/firebase/init";
import { doc, getDoc } from "firebase/firestore";
import { ChatUser } from "../types";

export const getChatUsers = async (userList: string[], authUserId?: string) => {
  const users = userList.filter((id: string) => id !== authUserId);
  const result: ChatUser[] = [];

  for (const id of users) {
    const userRes = await getDoc(doc(firestore, "users", id));
    const userData = userRes.data();

    if (userData) {
      result.push({
        id: userRes.id,
        name: userData.name,
        photoURL: userData.photoURL,
      });
    }
  }

  return result;
};
