import styles from "./LogInForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/form";
import { useLogin } from "../../api/login";
import { LoginValues } from "../../types";
import { LoaderPopup } from "@/components/Loader";
import { useTranslation } from "react-i18next";

export const LogInForm = () => {
  const methods = useForm<LoginValues>();
  const { onSubmit, isLoading, error } = useLogin();
  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          label={t("login.Email")}
          type="email"
          name="email"
          validation={{
            required: t("error.Email address is required"),
            maxLength: { value: 255, message: t("error.Name is too long") },
          }}
          data-testid="login-form-email"
        />
        <FormInput
          label={t("login.Password")}
          type="password"
          name="password"
          validation={{
            required: t("error.Password is required"),
            maxLength: { value: 127, message: t("error.Password is too long") },
            minLength: { value: 6, message: t("error.Password is too short") },
          }}
          data-testid="login-form-password"
        />
        <p className={styles.error}>{error}</p>
        <button type="submit" className={styles.submit} data-testid="login-form-submit">
          {t("login.Log In")}
        </button>
      </form>
      {isLoading && <LoaderPopup />}
    </FormProvider>
  );
};
