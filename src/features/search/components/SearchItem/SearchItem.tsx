import styles from "./SearchItem.module.scss";
import { ListItem } from "@/components/list/ListItem";
import { SearchItemType } from "../../types";
import { useAppDispatch } from "@/store";
import { useTranslation } from "react-i18next";
import { pickSearchItem } from "../../api/pick-search-item";

type Props = {
  data: SearchItemType;
};

export function SearchItem({ data }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <ListItem
      photoURL={data.photoURL}
      title={data.title}
      online={false}
      onClick={() => pickSearchItem(data, dispatch)}
    >
      <p className={styles.type}>
        {t(data.category)} {t("chat.chat")}
      </p>
    </ListItem>
  );
}
