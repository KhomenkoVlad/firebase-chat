import dayjs from "dayjs";
import { QueryDocumentSnapshot, Timestamp } from "firebase/firestore";

export const showDayLine = (doc: QueryDocumentSnapshot, nextDoc?: QueryDocumentSnapshot) => {
  if (!nextDoc) return true;

  const thisDate = doc.data().createdAt;
  const nextDate = nextDoc.data().createdAt;

  const getDay = (date: Timestamp) => dayjs(date.toDate()).format("DD MMMM YYYY");

  if (getDay(thisDate) !== getDay(nextDate)) {
    return true;
  }
  return false;
};
