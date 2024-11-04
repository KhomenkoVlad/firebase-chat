import styles from "./LogInService.module.scss";
import { auth } from "@/lib/firebase/init";
import { AuthProvider, signInWithRedirect } from "firebase/auth";

type Props = {
  provider: AuthProvider;
  title?: string;
};

export const LogInService = ({ provider, title }: Props) => {
  return (
    <button
      className={styles.authButton}
      type="button"
      onClick={() => signInWithRedirect(auth, provider)}
    >
      {title}
    </button>
  );
};
