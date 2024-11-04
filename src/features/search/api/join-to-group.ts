import { firestore } from "@/lib/firebase/init";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { SearchItemType } from "../types";
import { ChatType, getChatUsers, transformChat } from "@/features/chats";

export const joinToGroup = async (group: SearchItemType, authUserId?: string) => {
  if (!authUserId || !group) return null;

  try {
    const groupRef = doc(firestore, "chats", group.id);
    const groupDoc = (await getDoc(groupRef)).data() as ChatType;
    const users = await getChatUsers(groupDoc.users);

    await updateDoc(groupRef, {
      users: arrayUnion(authUserId),
    });
    await updateDoc(doc(firestore, "users", authUserId), {
      chats: arrayUnion(group.id),
    });

    return transformChat(groupDoc, group.id, users);
  } catch (error) {
    console.error(error);
    return null;
  }
};
