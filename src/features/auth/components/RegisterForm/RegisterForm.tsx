import styles from "./RegisterForm.module.scss";
import { FormInput } from "@/components/form";
import { FormProvider, useForm } from "react-hook-form";
import { useRegister } from "../../api/register";
import { RegisterValues } from "../../types";
import { LoaderPopup } from "@/components/Loader";
import { useTranslation } from "react-i18next";

export const RegisterForm = () => {
  const methods = useForm<RegisterValues>();
  const { createUser, isLoading, error } = useRegister();
  const { t } = useTranslation();

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(createUser)}>
        <FormInput
          label={t("login.Name")}
          type="text"
          name="name"
          validation={{
            required: t("error.Name is required"),
            maxLength: { value: 40, message: t("error.Name is too long") },
          }}
          data-testid="register-form-name"
        />
        <FormInput
          label={t("login.Email")}
          type="email"
          name="email"
          validation={{
            required: t("error.Email address is required"),
            maxLength: { value: 255, message: t("error.Name is too long") },
          }}
          data-testid="register-form-email"
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
          data-testid="register-form-password"
        />
        <FormInput
          name="photo"
          label={t("login.Your picture")}
          type="file"
          data-testid="register-form-file"
        />
        <p className={styles.error}>{error}</p>
        <button type="submit" className={styles.submit} data-testid="register-form-submit">
          {t("login.Sign Up")}
        </button>
      </form>
      {isLoading && <LoaderPopup />}
    </FormProvider>
  );
};
