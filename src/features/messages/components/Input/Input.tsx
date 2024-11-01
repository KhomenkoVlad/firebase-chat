import styles from "./Input.module.scss";
import { usePostMessage } from "../../api/post-message";
import { useForm } from "react-hook-form";
import { FileInput } from "../FileInput";
import { LoaderPopup } from "@/components/Loader";
import { useTranslation } from "react-i18next";

export type MessageValues = {
  text?: string;
  image?: any;
};

export const Input = () => {
  const { register, handleSubmit, control, reset } = useForm<MessageValues>();
  const { onSubmit, isLoading } = usePostMessage(reset);
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
      <FileInput register={register} control={control} />
      <textarea
        placeholder={t("chat.Type message")}
        {...register("text")}
        className={styles.input}
        data-testid="message-field"
      />
      <button
        type="submit"
        className={styles.send}
        title={t("chat.Send a message")}
        data-testid="message-submit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480l0-83.6c0-4 1.5-7.8 4.2-10.8L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
        </svg>
      </button>
      {isLoading && <LoaderPopup />}
    </form>
  );
};
