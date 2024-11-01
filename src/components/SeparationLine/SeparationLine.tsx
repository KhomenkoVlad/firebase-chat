import styles from "./SeparationLine.module.scss";

export const SeparationLine = ({ text }: { text: string }) => {
  return (
    <div className={styles.separator}>
      <p className={styles.text}>{text}</p>
    </div>
  );
};
