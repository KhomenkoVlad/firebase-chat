import styles from "./ChatSubTitle.module.scss";
import { FullChatType } from "../../types";
import { useChatOnline } from "@/features/auth";
import { useTranslation } from "react-i18next";

type Props = {
  chat: FullChatType;
};

export function ChatSubTitle({ chat }: Props) {
  const online = useChatOnline(chat);
  const { t } = useTranslation();

  if (chat.category === "group") {
    const users = chat.users.map(el => el.name).join(", ");

    return (
      <p className={styles.offline} title={users}>
        {users}
      </p>
    );
  } else {
    return online ? (
      <p className={styles.online}>{t("chat.Online")}</p>
    ) : (
      <p className={styles.offline}>{t("chat.Offline")}</p>
    );
  }
}
