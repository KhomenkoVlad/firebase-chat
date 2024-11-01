import { ThunkApiConfig } from "@/store";
import { doc, getDoc } from "firebase/firestore";
import { UserType } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const authUserThunk = createAsyncThunk<UserType | null, void, ThunkApiConfig>(
  "auth/user",
  async (_, thunkAPI) => {
    const { firestore, auth } = thunkAPI.extra;

    if (auth.currentUser) {
      const userRef = doc(firestore, "users", auth.currentUser.uid);
      return (await getDoc(userRef)).data() as UserType;
    }

    return null;
  }
);
