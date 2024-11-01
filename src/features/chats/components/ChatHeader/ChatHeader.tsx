import styles from "./ChatHeader.module.scss";
import { NavigationButton } from "@/components/buttons";
import { ChatAvatar } from "@/components/ChatAvatar";
import { useAppDispatch, useAppSelector } from "@/store";
import { ChatSubTitle } from "../ChatSubTitle";
import { useTranslation } from "react-i18next";
import { chatSlice } from "../../store";

export function ChatHeader() {
  const chat = useAppSelector(chatSlice.selectors.selectChat);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  if (chat) {
    return (
      <header className={styles.header}>
        <ChatAvatar name={chat.title} photoURL={chat.photoURL} />
        <div className={styles.titles}>
          <p className={styles.name}>{chat.title}</p>
          <ChatSubTitle chat={chat} />
        </div>
        <div className={styles.buttons}></div>
        <NavigationButton to="/chat-settings" icon="settings" title={t("settings.Chat Settings")} />
        <button
          className={styles.buttonIcon}
          onClick={() => dispatch(chatSlice.actions.resetChat())}
          title={t("settings.Go back")}
          data-testid="close-chat-button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className={styles.backImage}
          >
            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
          </svg>
        </button>
      </header>
    );
  }
}
