import { useTranslation } from "react-i18next";
import styles from "./Popup.module.scss";
import { memo, ReactNode } from "react";

type Props = {
  children: ReactNode;
  isVisible: boolean;
  toggle?: () => void;
};

export const Popup = memo(function ({ children, isVisible, toggle }: Props) {
  const { t } = useTranslation();

  if (isVisible) {
    return (
      <div className={styles.popup} role="dialog">
        {children}
        {toggle && (
          <button className={styles.closing} onClick={() => toggle()} title={t("Close")}>
            <svg role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path
                  fill="#fff"
                  d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zm168.1 61.7c.1-.7 .2-1.5 .3-2.3c.3-1.5 .7-3 1.3-4.4c1.2-2.9 2.9-5.6 5.3-7.9c15.7-15.7 31.4-31.4 47-47c-15.7-15.7-31.3-31.3-47-47c-9.4-9.4-9.4-24.6 0-33.9c4.7-4.7 10.8-7 17-7s12.3 2.3 17 7c15.7 15.7 31.4 31.4 47 47c15.7-15.7 31.4-31.4 47-47c4.7-4.7 10.8-7 17-7s12.3 2.3 17 7c9.4 9.4 9.4 24.6 0 33.9c-15.7 15.7-31.3 31.3-47 47c15.7 15.7 31.4 31.4 47 47c4.7 4.7 7 10.8 7 17s-2.3 12.3-7 17s-10.8 7-17 7s-12.3-2.3-17-7l-47-47c-15.7 15.7-31.3 31.3-47 47c-4.7 4.7-10.8 7-17 7s-12.3-2.3-17-7c-2.3-2.3-4.1-5.1-5.3-7.9c-.6-1.4-1-2.9-1.3-4.4c-.2-1.1-.4-2.3-.3-2.2c-.1-1.2-.1-1.2-.1-2.4c0-1.5 .1-1.9 .1-2.3z"
                ></path>
                <path
                  fill="#000"
                  d="M209 175c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47z"
                ></path>
              </g>
            </svg>
          </button>
        )}
      </div>
    );
  } else {
    return null;
  }
});
