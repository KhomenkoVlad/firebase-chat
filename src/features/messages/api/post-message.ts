import { useState } from "react";
import { Timestamp, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useAppSelector } from "@/store";
import { chatSlice } from "@/features/chats";
import { MessageValues } from "../components/Input";
import { UseFormReset } from "react-hook-form";
import { firestore } from "@/lib/firebase/init";
import { uploadPicture } from "@/lib/firebase/utils";

export const usePostMessage = (reset: UseFormReset<MessageValues>) => {
  const chatId = useAppSelector(chatSlice.selectors.selectId);
  const authUserId = useAppSelector(store => store.auth.user?.id);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (formData: MessageValues) => {
    if (!chatId || !authUserId) return;

    const [text, image] = [formData.text, formData.image[0]];

    if (!text && !image) return;

    setIsLoading(true);
    const time = Timestamp.now();

    try {
      const docRef = await addDoc(collection(firestore, "messages"), {
        text: text,
        createdAt: time,
        chatId: chatId,
        uid: authUserId,
        hasSeen: false,
        image: null,
      });

      if (image) {
        const uploadedImage = await uploadPicture("messages", image, docRef.id);
        await updateDoc(docRef, { image: uploadedImage });
      }

      updateDoc(doc(firestore, "chats", chatId), {
        lastMessage: {
          text: image ? "[image] " + text : text,
          createdAt: time,
          userId: authUserId,
          hasSeen: false,
        },
      });

      reset();
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, error, isLoading };
};
