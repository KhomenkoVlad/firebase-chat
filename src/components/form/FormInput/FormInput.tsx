import { RegisterOptions, useFormContext } from "react-hook-form";
import styles from "./FormInput.module.scss";
import { InputHTMLAttributes, useId } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  validation?: RegisterOptions;
}

export const FormInput = ({ name, label, validation, ...args }: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const id = useId();
  const errorMessage = getError(errors[name]);

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <input id={id} className={styles.input} {...register(name, validation)} {...args} />
      <p className={styles.error}>{errorMessage}</p>
    </div>
  );
};

const getError = (error: any) => {
  if (error && error.message) {
    return String(error.message);
  } else return null;
};
