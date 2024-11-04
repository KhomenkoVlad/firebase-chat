import styles from "./SearchItem.module.scss";
import { ListItem } from "@/components/list/ListItem";
import { SearchItemType } from "../../types";
import { useAppDispatch, useAppSelector } from "@/store";
import { useTranslation } from "react-i18next";
import { pickSearchItem } from "../../api/pick-search-item";
import { authSlice } from "@/features/auth";

type Props = {
  data: SearchItemType;
};

export function SearchItem({ data }: Props) {
  const dispatch = useAppDispatch();
  const authUserId = useAppSelector(authSlice.selectors.selectUserId);
  const { t } = useTranslation();

  return (
    <ListItem
      photoURL={data.photoURL}
      title={data.title}
      online={false}
      onClick={() => pickSearchItem(data, dispatch, authUserId)}
    >
      <p className={styles.type}>
        {t(data.category)} {t("chat.chat")}
      </p>
    </ListItem>
  );
}
