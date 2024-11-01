import { auth, firestore } from "@/lib/firebase/init";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterValues } from "../types";
import { uploadPicture } from "@/lib/firebase/utils";
import { useTranslation } from "react-i18next";

export const useRegister = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const createUser: SubmitHandler<RegisterValues> = async data => {
    setError("");
    setIsLoading(true);

    try {
      const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const uid = res?.user?.uid;

      if (!uid) {
        throw Error("Registration is failed");
      }

      const photo = data?.photo && data.photo[0];
      const photoURL = await uploadPicture("users", photo, uid);

      await setDoc(doc(firestore, "users", uid), {
        id: uid,
        name: data.name,
        email: data.email,
        photoURL: photoURL ? photoURL : "",
        chats: [],
      });

      navigate("/");
    } catch (error: any) {
      if (error?.code === "auth/email-already-in-use") {
        setError(t("error.Another account"));
      } else {
        setError(t("error.Something went wrong"));
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { createUser, isLoading, error };
};
