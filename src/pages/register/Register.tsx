import styles from "./Register.module.scss";
import { Link } from "react-router-dom";
import { SeparationLine } from "@/components/SeparationLine";
import { LogInService, RegisterForm } from "@/features/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useTranslation } from "react-i18next";

export const Register = () => {
  const { t } = useTranslation();

  return (
    <main className={styles.page}>
      <div className={styles.register}>
        <h1 className={styles.title}>{t("login.Registration")}</h1>
        <RegisterForm />
        <SeparationLine text={t("login.or")} />
        <LogInService provider={new GoogleAuthProvider()} title={t("login.Sign up with Google")} />
        <p className={styles.other}>
          {t("login.have account")} <Link to="/login">{t("login.Log In")}</Link>
        </p>
      </div>
    </main>
  );
};
