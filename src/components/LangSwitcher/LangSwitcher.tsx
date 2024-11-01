import styles from "./LangSwitcher.module.scss";
import { LANGUAGES } from "@/lib/i18next/constants";
import { useTranslation } from "react-i18next";

export const LangSwitcher = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h4 className={styles.title}>{t("settings.Languages")}:</h4>
      <div className={styles.list}>
        {LANGUAGES.map(language => (
          <button
            key={"button" + language.code}
            role="button"
            className={`${styles.language} ${i18n.language === language.code && styles.active}`}
            onClick={() => i18n.changeLanguage(language.code)}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
};
