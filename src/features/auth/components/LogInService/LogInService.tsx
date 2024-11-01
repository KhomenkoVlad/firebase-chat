import styles from "./LogInService.module.scss";
import { auth } from "@/lib/firebase/init";
import { AuthProvider, signInWithRedirect } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { postOnline } from "../../api/online";

type Props = {
  provider: AuthProvider;
  title?: string;
};

export const LogInService = ({ provider, title }: Props) => {
  const navigate = useNavigate();

  const logInWithProvider = () => {
    signInWithRedirect(auth, provider).then(async () => {
      postOnline(true);
      navigate("/");
    });
  };

  return (
    <button className={styles.authButton} type="button" onClick={logInWithProvider}>
      {title}
    </button>
  );
};
