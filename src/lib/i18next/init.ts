import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { LOCALES } from "./constants";
import LanguageDetector from "i18next-browser-languagedetector";
import uk from "./resources/uk.json";
import en from "./resources/en.json";

const resources = {
  [LOCALES.EN]: {
    translation: en,
  },
  [LOCALES.UK]: {
    translation: uk,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // supportedLngs: [LOCALES.EN, LOCALES.UK],
    fallbackLng: {
      [LOCALES.RU]: [LOCALES.UK],
      [LOCALES.RU_RU]: [LOCALES.UK],
      [LOCALES.UK]: [LOCALES.UK],
      [LOCALES.UK_UA]: [LOCALES.UK],
      default: [LOCALES.EN],
    },

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
