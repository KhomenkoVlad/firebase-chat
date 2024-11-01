import { firestore } from "@/lib/firebase/init";
import { deleteDoc, doc, getDocs } from "firebase/firestore";
import { allMessageQuery } from "../queries";

export const deleteAllMessages = async (chatId: string) => {
  const messages = await getDocs(allMessageQuery(chatId));

  try {
    await Promise.all(messages.docs.map(msg => deleteDoc(doc(firestore, "messages", msg.id))));
    return true;
  } catch (error) {
    throw Error("Messages were not deleted!");
  }
};
