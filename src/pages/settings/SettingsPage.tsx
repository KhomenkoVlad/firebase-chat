import styles from "./SettingsPage.module.scss";
import { NavigationButton } from "@/components/buttons";
import { authSlice } from "@/features/auth";
import { chatSlice } from "@/features/chats";
import { SettingsSection } from "@/layouts/SettingsSection";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export const SettingsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <NavigationButton
        to="/"
        className={styles.closingButton}
        icon="leftArrow"
        title={t("settings.Go back")}
      />
      {location.pathname === "/chat-settings" && (
        <SettingsSection collection="chats" selector={chatSlice.selectors.selectChat} />
      )}
      {location.pathname === "/user-settings" && (
        <SettingsSection collection="users" selector={authSlice.selectors.selectFullUser} />
      )}
    </main>
  );
};
