import styles from "./SearchField.module.scss";
import { useSearch } from "../../api/get-search";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

export const SearchField = () => {
  const { t } = useTranslation();
  const inputField = useRef<HTMLInputElement>(null);
  const { setSearch } = useSearch();

  useEffect(() => {
    const resetSearch = () => {
      if (inputField.current) {
        setSearch("");
        inputField.current.value = "";
      }
    };

    document.addEventListener("resetsearch", resetSearch);

    return () => document.removeEventListener("resetsearch", resetSearch);
  }, []);

  return (
    <div className={styles.search}>
      <img src="./icons/search.svg" alt="search icon" className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder={t("navBar.Search")}
        onChange={e => setSearch(e.target.value)}
        ref={inputField}
        data-testid="search-field"
      />
    </div>
  );
};
