import styles from "./MessageBody.module.scss";
import { ReactNode } from "react";
import { DisplayedMessageType } from "../../types";
import { useImagePopup } from "@/components/ImagePopup";

type Props = {
  data: DisplayedMessageType;
  children?: ReactNode;
};

export const MessageBody = ({ data, children }: Props) => {
  const setImagePopup = useImagePopup();

  return (
    <div className={styles.message} data-testid="message-body">
      {data.image && (
        <img
          src={data.image}
          alt={"message with image"}
          className={styles.image}
          onClick={() => setImagePopup(data.image)}
        />
      )}
      <p className={styles.text}>{data.text}</p>
      <div className={styles.time}>
        {children}
        <span title={`${data.time} ${data.date}`}>{data.time}</span>
      </div>
    </div>
  );
};
