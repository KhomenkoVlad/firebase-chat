import { firestore } from "@/lib/firebase/init";
import { QueryDocumentSnapshot, doc, updateDoc } from "firebase/firestore";

export const setHaveSeenMessages = (messageArray: QueryDocumentSnapshot[], authUserId?: string) => {
  messageArray.forEach(msg => {
    const data = msg.data();
    if (data.uid !== authUserId && !data.hasSeen) {
      updateDoc(doc(firestore, "messages", msg.id), {
        hasSeen: true,
      });
    }
  });
};

export const haveSeenMessage = (message: QueryDocumentSnapshot) => {
  updateDoc(message.ref, {
    hasSeen: true,
  });
};

export const haveSeenLastMessage = (chatId?: string) => {
  if (!chatId) return;

  updateDoc(doc(firestore, "chats", chatId), {
    ["lastMessage.hasSeen"]: true,
  });
};
