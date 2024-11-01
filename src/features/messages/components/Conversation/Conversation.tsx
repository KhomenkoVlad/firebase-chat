import styles from "./Conversation.module.scss";
import { Message } from "../Message";
import { useMessages } from "../../api/get-messages";
import { useLoadScroll } from "@/utils/hooks/useLoadScroll";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { showDayLine } from "../../utils/showDayLine";
import { ImagePopup } from "@/components/ImagePopup";

export const Conversation = () => {
  const [loader, isIntersecting] = useLoadScroll();
  const messages = useMessages(isIntersecting);

  return (
    <ImagePopup>
      <div className={styles.conversation} data-testid="chat-section">
        {messages.map((doc: QueryDocumentSnapshot, index: number) => (
          <Message
            key={"message-" + doc.id + index}
            doc={doc}
            showLine={showDayLine(doc, messages[index + 1])}
          />
        ))}
        <div ref={loader} />
      </div>
    </ImagePopup>
  );
};
