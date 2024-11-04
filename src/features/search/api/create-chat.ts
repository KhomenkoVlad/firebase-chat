import { firestore } from "@/lib/firebase/init";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { getChatUsers, transformChat } from "@/features/chats";

export const createChat = async (chatUserId: string, authUserId?: string) => {
  if (!authUserId || !chatUserId) return null;

  try {
    const chatData = {
      title: "",
      photoURL: "",
      users: [authUserId, chatUserId],
    };

    const docRef = await addDoc(collection(firestore, "chats"), chatData);

    const updateChatArray = async (userId: string) =>
      await updateDoc(doc(firestore, "users", userId), {
        chats: arrayUnion(docRef.id),
      });

    await updateChatArray(authUserId);
    await updateChatArray(chatUserId);

    const users = await getChatUsers(chatData.users, authUserId);

    return transformChat(chatData, docRef.id, users);
  } catch (error) {
    console.error(error);
    return null;
  }
};
