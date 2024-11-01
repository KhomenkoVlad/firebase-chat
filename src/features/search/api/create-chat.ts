import { firestore } from "@/lib/firebase/init";
import { store } from "@/store";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { SearchItemType } from "../types";
import { getChatUsers, transformChat } from "@/features/chats";

export const createChat = async (chatUser: SearchItemType) => {
  const authUser = store.getState().auth.user;

  if (!authUser || !chatUser) return null;

  try {
    const chatData = {
      title: "",
      photoURL: "",
      users: [authUser.id, chatUser.id],
    };

    const docRef = await addDoc(collection(firestore, "chats"), chatData);

    const updateChatArray = async (userId: string) =>
      await updateDoc(doc(firestore, "users", userId), {
        chats: arrayUnion(docRef.id),
      });

    await updateChatArray(authUser.id);
    await updateChatArray(chatUser.id);

    const users = await getChatUsers(chatData.users, authUser.id);

    return transformChat(chatData, docRef.id, users);
  } catch (error) {
    console.error(error);
    return null;
  }
};
