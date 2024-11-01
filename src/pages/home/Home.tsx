import styles from "./Home.module.scss";
import { WINDOW_SIZE_TABLET } from "@/config/constants";
import { chatSlice } from "@/features/chats";
import { ChatSection } from "@/layouts/ChatSection";
import { NavigationSection } from "@/layouts/NavigationSection";
import { useAppSelector } from "@/store";
import useWindowSize from "@/utils/hooks/useWindowSize";

export function Home() {
  const windowSize = useWindowSize();
  const isChatSelected = useAppSelector(chatSlice.selectors.isChatSelected);

  if (windowSize.width > WINDOW_SIZE_TABLET) {
    return (
      <main className={styles.page}>
        <NavigationSection />
        <ChatSection isChatSelected={isChatSelected} />
      </main>
    );
  }

  return (
    <main className={styles.page}>{isChatSelected ? <ChatSection /> : <NavigationSection />}</main>
  );
}
