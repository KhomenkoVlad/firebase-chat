import { QuerySnapshot } from "firebase/firestore";
import { SearchItemType } from "../types";
import { ChatCategoryType } from "@/features/chats";

export const transformSearchItems = (category: ChatCategoryType, data?: QuerySnapshot) => {
  const result: SearchItemType[] = [];

  if (data) {
    data.forEach(el => {
      const parsed = el.data();
      result.push({
        id: el.id,
        category: category,
        title: parsed.title ? parsed.title : parsed.name,
        photoURL: parsed.photoURL,
      });
    });
  }

  return result;
};
