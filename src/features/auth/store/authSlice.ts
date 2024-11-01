import { UserType } from "../types";
import { authUserThunk } from "./authAsyncThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: UserType | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
};

const initialState: AuthState = {
  user: null,
  status: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  selectors: {
    selectIsAuthPending: state => state.status === "pending",
    selectUserChats: state => state?.user?.chats,
    selectUserId: state => state?.user?.id,
    selectFullUser: state => state?.user,
  },
  reducers: {
    updateInfo: (state, action: PayloadAction<{ name: string; photoURL: string }>) => {
      const { name, photoURL } = action.payload;

      if (state.user) {
        state.user.name = name;
        state.user.photoURL = photoURL;
      }
    },
    addChat: (state, action: PayloadAction<string>) => {
      if (state.user) {
        state.user.chats = [...state.user.chats, action.payload];
      }
    },
    logOut: state => {
      state.user = null;
      state.status = "idle";
    },
  },
  extraReducers(builder) {
    builder.addCase(authUserThunk.pending, state => {
      state.status = "pending";
    });
    builder.addCase(authUserThunk.fulfilled, (state, action) => {
      state.user = action.payload;
      state.status = "fulfilled";
    });
    builder.addCase(authUserThunk.rejected, state => {
      state.user = null;
      state.status = "rejected";
    });
  },
});
