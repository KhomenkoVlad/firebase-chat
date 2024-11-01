import styles from "./ChatItem.module.scss";
import { useAppDispatch } from "@/store";
import { useChat } from "../../api/get-chat";
import { chatSlice } from "../../store";
import { ListItem } from "@/components/list/ListItem";
import { ChatIndicator } from "../ChatIndicator";
import moment from "moment/min/moment-with-locales";
import { useTranslation } from "react-i18next";

type Props = {
  chatId: string;
};

export function ChatItem({ chatId }: Props) {
  const [chat, online, isLoading] = useChat(chatId);
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();

  if (isLoading || !chat) return null;

  const handleClick = () => dispatch(chatSlice.actions.setChat(chat));
  const timeFromNow =
    chat.lastMessage &&
    moment(new Date(chat.lastMessage.createdAt)).locale(i18n.language).fromNow();

  return (
    <ListItem photoURL={chat.photoURL} title={chat.title} online={online} onClick={handleClick}>
      <p className={styles.message}>{chat?.lastMessage?.text}</p>
      <p className={styles.time} title={chat.lastMessage?.createdAt}>
        {timeFromNow}
      </p>
      <ChatIndicator chat={chat} />
    </ListItem>
  );
}
