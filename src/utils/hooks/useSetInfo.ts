import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { SubmitHandler } from "react-hook-form";
import { InfoValues, UserType } from "@/features/auth";
import { FullChatType } from "@/features/chats";
import { CollectionType } from "@/types";
import { firestore } from "../../lib/firebase/init";
import { uploadPicture } from "../../lib/firebase/utils";

export const useSetInfo = (
  collection: CollectionType,
  docData: UserType | FullChatType,
  updateStoreFn?: (formData: any) => void
) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<InfoValues> = async formData => {
    setError("");

    const [newPhoto, newName] = [formData.photo[0], formData.name];
    if (!newPhoto && !newName) return;

    try {
      setIsLoading(true);
      const newPhotoURL = await uploadPicture(collection, newPhoto, docData.id);
      const newInfo = getNewInfo(collection, docData, { name: newName, photoURL: newPhotoURL });

      await updateDoc(doc(firestore, collection, docData.id), newInfo);
      updateStoreFn && updateStoreFn(newInfo);

      navigate("/");
    } catch (error) {
      setError("Something went wrong.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, error, isLoading };
};

const getNewInfo = (collection: CollectionType, docData: UserType | FullChatType, newData: any) => {
  const photoURL = newData.photoURL || docData.photoURL;

  switch (collection) {
    case "users":
      return {
        photoURL,
        name: newData.name || (docData as UserType).name,
      };
    case "chats":
      return {
        photoURL,
        title: newData.name || (docData as FullChatType).title,
      };
    default:
      throw Error("It should not be here.");
  }
};
