import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "@/lib/firebase/init";

export const useChatList = () => {
  const docRef = auth.currentUser && doc(firestore, "users", auth.currentUser?.uid);
  const [data] = useDocumentData(docRef);

  return data?.chats;
};
