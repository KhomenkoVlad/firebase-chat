import styles from "./ChatSection.module.scss";
import { Conversation, Input } from "@/features/messages";
import { ChatHeader } from "@/features/chats";

type Props = {
  isChatSelected?: boolean;
};

export const ChatSection = ({ isChatSelected = true }: Props) => {
  return (
    <section className={styles.chatSection}>
      {isChatSelected && (
        <>
          <ChatHeader />
          <Conversation />
          <Input />
        </>
      )}
    </section>
  );
};
