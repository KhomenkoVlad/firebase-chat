import styles from "./SettingsForm.module.scss";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput } from "@/components/form";
import { InfoValues, UserType } from "@/features/auth";
import { LoaderPopup } from "@/components/Loader";
import { useSetInfo } from "@/utils/hooks/useSetInfo";
import { FullChatType } from "@/features/chats";
import { CollectionType } from "@/types";
import { useTranslation } from "react-i18next";
import { UpdatePropsType } from "@/layouts/SettingsSection";

type Props = {
  collection: CollectionType;
  docData: UserType | FullChatType;
  updateStoreFn?: (formData: UpdatePropsType) => void;
};

export const SettingsForm = ({ collection, docData, updateStoreFn }: Props) => {
  const { t } = useTranslation("translation", { keyPrefix: "settings" });
  const methods = useForm<InfoValues>();
  const { onSubmit, error, isLoading } = useSetInfo(collection, docData, updateStoreFn);

  return (
    <FormProvider {...methods}>
      <form className={styles.form} onSubmit={methods.handleSubmit(onSubmit)}>
        <FormInput
          name="name"
          label={t("New name") + ":"}
          type="text"
          validation={{
            maxLength: { value: 40, message: "Name is too long" },
            setValueAs: (value: string) => value.trim(),
          }}
        />
        <FormInput name="photo" label={t("New picture") + ":"} type="file" accept="image/*" />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.submit}>
          {t("Save")}
        </button>
      </form>
      {isLoading && <LoaderPopup />}
    </FormProvider>
  );
};
