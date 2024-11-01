import { ReactNode } from "react";
import { ChatAvatar } from "../../ChatAvatar";
import styles from "./ListItem.module.scss";

type Props = {
  photoURL?: string;
  title: string;
  online?: boolean;
  onClick?: () => void;
  children?: ReactNode | ReactNode[];
};

export function ListItem({ photoURL, title, online, onClick, children }: Props) {
  return (
    <div className={styles.listItem} onClick={onClick} data-testid="list-item">
      <ChatAvatar photoURL={photoURL} name={title} online={online} />
      <div className={styles.info}>
        <h3 className={styles.title} title={title}>
          {title}
        </h3>
        {children}
      </div>
    </div>
  );
}
