import styles from "./ChatAvatar.module.scss";

type Props = {
  photoURL?: string;
  name: string;
  online?: boolean;
};

export const ChatAvatar = ({ photoURL, name, online }: Props) => {
  return (
    <div className={styles.avatar}>
      {photoURL ? (
        <img src={photoURL} alt={"Photo of " + name} className={styles.photo} />
      ) : (
        <div className={styles.letterIcon} role="img">
          {name.charAt(0)}
        </div>
      )}
      {online === true && (
        <div className={styles.onlineWrap}>
          <div className={styles.online} data-testid="online-indicator"></div>
        </div>
      )}
    </div>
  );
};
