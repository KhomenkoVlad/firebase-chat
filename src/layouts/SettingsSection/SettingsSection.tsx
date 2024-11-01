import styles from "./SettingsSection.module.scss";
import { ChatAvatar } from "@/components/ChatAvatar";
import { SettingsForm } from "@/components/form/SettingsForm";
import { LangSwitcher } from "@/components/LangSwitcher";
import { authSlice, UserType } from "@/features/auth";
import { chatSlice, deleteChat, FullChatType } from "@/features/chats";
import { useAppDispatch, useAppSelector } from "@/store";
import { CollectionType } from "@/types";
import { Selector } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export type UpdatePropsType = {
  name: string;
  photoURL: string;
} & {
  title: string;
  photoURL: string;
};

type Props = {
  collection: CollectionType;
  selector: Selector;
};

export const SettingsSection = ({ collection, selector }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "settings" });
  const data = useAppSelector(selector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (data === null) return <h1 className={styles.title}>Go back to home page.</h1>;

  if (collection === "users") {
    const { name, photoURL } = data as UserType;

    const updateUser = (formData: UpdatePropsType) => {
      dispatch(authSlice.actions.updateInfo(formData));
    };

    return (
      <section className={styles.page}>
        <h1 className={styles.title}>{t("User Settings")}</h1>
        <div className={styles.info}>
          <ChatAvatar name={name} photoURL={photoURL} />
          <h3 className={styles.name}>{name}</h3>
        </div>
        <LangSwitcher />
        <h2 className={styles.formTitle}>{t("Change your info")}</h2>
        <SettingsForm
          collection={collection}
          docData={data as UserType}
          updateStoreFn={updateUser}
        />
      </section>
    );
  } else if (data && collection === "chats") {
    const { id, title, photoURL } = data as FullChatType;

    const updateChat = (formData: UpdatePropsType) => {
      dispatch(chatSlice.actions.updateInfo(formData));
    };

    return (
      <section className={styles.page}>
        <h1 className={styles.title}>{t("Chat Settings")}</h1>
        <div className={styles.info}>
          <ChatAvatar name={title} photoURL={photoURL} />
          <h3 className={styles.name}>{title}</h3>
        </div>
        <h2 className={styles.formTitle}>{t("Change chat info")}</h2>
        <p>{t("Change chat description")}</p>
        <SettingsForm
          collection={collection}
          docData={data as FullChatType}
          updateStoreFn={updateChat}
        />
        <button
          className={styles.deleteButton}
          onClick={() => {
            deleteChat(id);
            dispatch(chatSlice.actions.resetChat());
            navigate("/");
          }}
          data-testid="settings-delete-chat"
        >
          {t("Delete the chat")}
        </button>
      </section>
    );
  }
};
