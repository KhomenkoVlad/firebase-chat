import styles from "./ChatIndicator.module.scss";
import { FullChatType } from "../../types";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { allUnreadMessages } from "../../queries";
import { useAppSelector } from "@/store";
import { authSlice } from "@/features/auth";
import { useTranslation } from "react-i18next";

type Props = {
  chat: FullChatType;
};

export function ChatIndicator({ chat }: Props) {
  const authId = useAppSelector(authSlice.selectors.selectUserId);
  const { t } = useTranslation();

  const [unreadMessages] = useCollectionData(allUnreadMessages(chat.id));
  const unreadLenght = unreadMessages?.filter(el => el.uid !== authId).length;

  if (!chat.lastMessage || !authId) return null;

  if (unreadLenght && unreadLenght > 0) {
    return (
      <div className={styles.unread}>
        <div className={styles.unreadNumber}>{unreadLenght < 99 ? unreadLenght : "99"}</div>
      </div>
    );
  }

  if (chat.lastMessage && chat.lastMessage.userId === authId) {
    return (
      <div className={styles.check}>
        {chat.lastMessage.hasSeen ? (
          <img
            src="/icons/double-check.svg"
            alt="check image"
            title={t("navBar.A user has seen")}
          />
        ) : (
          <img src="/icons/check.svg" alt="check image" title={t("navBar.Nobody has seen")} />
        )}
      </div>
    );
  }
}
