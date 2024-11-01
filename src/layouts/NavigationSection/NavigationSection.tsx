import styles from "./NavigationSection.module.scss";
import { List } from "@/components/list/List";
import { LogOutButton } from "@/features/auth";
import { SearchField, SearchItem, searchSlice } from "@/features/search";
import { useAppSelector } from "@/store";
import { ChatItem, useChatList } from "@/features/chats";
import { NavigationButton } from "@/components/buttons";
import { useTranslation } from "react-i18next";

export const NavigationSection = () => {
  const { t } = useTranslation();
  const search = useAppSelector(searchSlice.selectors.selectResult);
  const chats = useChatList();

  return (
    <section className={styles.navSection}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("navBar.Messages")}</h1>
        <nav className={styles.icons}>
          <NavigationButton to="/user-settings" icon="settings" title={t("navBar.Settings")} />
          <LogOutButton />
        </nav>
        <SearchField />
      </header>
      {search ? (
        <List data={search} render={el => <SearchItem key={"search-" + el.id} data={el} />} />
      ) : (
        <List
          data={chats as string[]}
          render={elId => <ChatItem key={"chat-" + elId} chatId={elId} />}
        />
      )}
    </section>
  );
};
