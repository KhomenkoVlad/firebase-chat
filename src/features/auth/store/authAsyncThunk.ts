import { ThunkApiConfig } from "@/store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserType } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { createChat } from "@/features/search";

export const authUserThunk = createAsyncThunk<UserType | null, void, ThunkApiConfig>(
  "auth/user",
  async (_, thunkAPI) => {
    const { firestore, auth } = thunkAPI.extra;
    const user = auth.currentUser;

    if (!user) return null;

    const userRef = doc(firestore, "users", user.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserType;
    } else {
      const userData = {
        id: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL ? user.photoURL : "",
        chats: [],
      };

      await setDoc(userRef, userData);
      await createChat("Xe09txdDYeUJ7D8rRbR1wwF6jPH3", userData.id);

      return userData as UserType;
    }
  }
);
