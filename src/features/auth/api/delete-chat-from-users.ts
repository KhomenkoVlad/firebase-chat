import { firestore } from "@/lib/firebase/init";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export const deleteChatFromUsers = async (chatId: string, users: string[]) => {
  try {
    users.map(async (userId: string) => {
      const userRef = doc(firestore, "users", userId);
      const user = (await getDoc(userRef)).data();

      if (user) {
        const updatedChatArray = user?.chats.filter((id: string) => id !== chatId);
        await updateDoc(userRef, { chats: updatedChatArray });
      }
    });
  } catch (error) {
    throw Error("Chat's id was not deleted from user documents!");
  }
};
