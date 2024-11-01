import { firestore } from "@/lib/firebase/init";
import { store } from "@/store";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { SearchItemType } from "../types";
import { ChatType, getChatUsers, transformChat } from "@/features/chats";

export const joinToGroup = async (group: SearchItemType) => {
  const authUser = store.getState().auth.user;

  if (!authUser || !group) return null;

  try {
    const groupRef = doc(firestore, "chats", group.id);
    const groupDoc = (await getDoc(groupRef)).data() as ChatType;
    const users = await getChatUsers(groupDoc.users);

    await updateDoc(groupRef, {
      users: arrayUnion(authUser.id),
    });
    await updateDoc(doc(firestore, "users", authUser.id), {
      chats: arrayUnion(group.id),
    });

    return transformChat(groupDoc, group.id, users);
  } catch (error) {
    console.error(error);
    return null;
  }
};
