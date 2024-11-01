import { DocumentData } from "firebase/firestore";
import { ChatUser } from "@/features/chats";
import { DisplayedMessageType } from "../types";
import moment from "moment/min/moment-with-locales";
import i18n from "@/lib/i18next/init";

export const transformMessage = (
  data?: DocumentData,
  authUserId?: string,
  users?: ChatUser[]
): DisplayedMessageType | null => {
  if (data && authUserId && users) {
    const createdAt = moment(data.createdAt.toMillis()).locale(i18n.language);

    return {
      isAuthUser: data.uid === authUserId,
      hasSeen: data.hasSeen,
      text: data.text,
      time: createdAt.format("HH:mm"),
      date: createdAt.format("DD MMMM YYYY"),
      user: users.find(user => user.id === data.uid) || users[0],
      image: data.image,
    };
  } else {
    return null;
  }
};
