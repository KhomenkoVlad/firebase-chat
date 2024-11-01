import { Control, UseFormRegister, useWatch } from "react-hook-form";
import { MessageValues } from "../Input";
import styles from "./FileInput.module.scss";
import { InputHTMLAttributes, useId, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface FileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<MessageValues>;
  control: Control<MessageValues>;
}

export const FileInput = ({ register, control }: FileInputProps) => {
  const { t } = useTranslation();
  const image = useWatch({
    control: control,
    name: "image",
  });
  const id = useId();

  const imageURL = useMemo(() => {
    if (image) {
      return `url("${URL.createObjectURL(image[0])}")`;
    }
  }, [image]);

  return (
    <div>
      <label
        title={t("chat.Attach an image")}
        className={`${styles.label} ${image ? styles.labelImage : styles.labelSvg}`}
        htmlFor={id}
        style={{ backgroundImage: image ? imageURL : 'url("./icons/paper-clip.svg")' }}
      ></label>
      <input id={id} type="file" {...register("image")} accept="image/*" className={styles.input} />
    </div>
  );
};
