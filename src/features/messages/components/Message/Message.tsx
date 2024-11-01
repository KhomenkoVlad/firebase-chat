import styles from "./Message.module.scss";
import { ChatAvatar } from "@/components/ChatAvatar";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { SeparationLine } from "@/components/SeparationLine";
import { useGetMessage } from "../../api/get-message";
import { memo } from "react";
import { MessageBody } from "../MessageBody";

type Props = {
  doc: QueryDocumentSnapshot;
  showLine: boolean | "end";
};

export const Message = memo(({ doc, showLine }: Props) => {
  const { message } = useGetMessage(doc);

  if (!message) return null;

  return (
    <>
      {message.isAuthUser ? (
        <div className={styles.currentUser}>
          <MessageBody data={message}>
            <img
              src={message.hasSeen ? "./icons/double-check.svg" : "./icons/check.svg"}
              className={styles.check}
            />
          </MessageBody>
        </div>
      ) : (
        <div className={styles.otherUser}>
          <div className={styles.messageAvatar}>
            <ChatAvatar name={message.user.name} online={false} photoURL={message.user.photoURL} />
          </div>
          <MessageBody data={message} />
        </div>
      )}
      {showLine && <SeparationLine key={"line-" + message.date} text={message.date} />}
    </>
  );
});
