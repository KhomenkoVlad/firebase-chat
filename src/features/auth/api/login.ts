import { auth } from "@/lib/firebase/init";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginValues } from "../types";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { t } = useTranslation();

  const onSubmit: SubmitHandler<LoginValues> = data => {
    setError("");
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch(error => {
        if (error.code === "auth/invalid-credential") {
          setError(t("error.Password is incorrect"));
          console.error(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { onSubmit, isLoading, error };
};
