import styles from "./Login.module.scss";
import { GoogleAuthProvider } from "firebase/auth";
import { Link } from "react-router-dom";
import { SeparationLine } from "@/components/SeparationLine";
import { LogInForm, LogInService } from "@/features/auth";
import { useTranslation } from "react-i18next";

export const Login = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <div className={styles.login}>
        <h1 className={styles.title}>{t("login.Log In")}</h1>
        <LogInForm />
        <SeparationLine text={t("login.or")} />
        <LogInService provider={new GoogleAuthProvider()} title={t("login.Log in with Google")} />
        <p className={styles.register}>
          {t("login.dont have account")}{" "}
          <Link to="/register" data-testid="form-login-to-register">
            {t("login.Create new account")}
          </Link>
        </p>
      </div>
    </main>
  );
};
