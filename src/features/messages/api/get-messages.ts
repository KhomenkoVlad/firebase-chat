import { useEffect, useState } from "react";
import { firstMessageQuery, messagesQuery } from "../queries";
import { useAppSelector } from "@/store";
import { useCollection } from "react-firebase-hooks/firestore";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { chatSlice } from "@/features/chats";

export const useMessages = (isIntersecting: boolean) => {
  const chatId = useAppSelector(chatSlice.selectors.selectId);

  const [last, setLast] = useState<QueryDocumentSnapshot | "end">();
  const [query, setQuery] = useState(messagesQuery(chatId, last));
  const [messages, setMessages] = useState<QueryDocumentSnapshot[]>([]);

  const [first] = useCollection(firstMessageQuery(chatId));
  const [data, isLoading] = useCollection(query);

  useEffect(() => {
    if (isIntersecting && !isLoading && last instanceof QueryDocumentSnapshot) {
      setQuery(messagesQuery(chatId, last));
    }
  }, [isIntersecting, last]);

  useEffect(() => {
    if (data?.docs.length) {
      const messagesIds = messages.map(msg => msg.id);
      const newMsgs = data?.docs.filter(msg => !messagesIds.includes(msg.id));

      setLast(newMsgs.at(-1));
      setMessages(prev => [...prev, ...newMsgs]);
    } else {
      setLast("end");
    }
  }, [data]);

  useEffect(() => {
    const firstMsg = first?.docs[0];
    const messagesIds = messages.map(msg => msg.id);

    if (firstMsg && messagesIds.length && !messagesIds.includes(firstMsg.id)) {
      setMessages(prev => [firstMsg, ...prev]);
    }
  }, [first?.docs[0]?.id]);

  useEffect(() => {
    setMessages([]);
    setLast(undefined);
    setQuery(messagesQuery(chatId, undefined));
  }, [chatId]);

  return messages;
};
