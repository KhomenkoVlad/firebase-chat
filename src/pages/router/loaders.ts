import { authUserThunk } from "@/features/auth";
import { isAuthState } from "@/lib/firebase/utils";
import { store } from "@/store";
import { redirect } from "react-router-dom";

const authLoader = async (condition: boolean, pathTo: string, cb?: () => void) => {
  const isUser = await isAuthState();
  if (isUser === condition) {
    return redirect(pathTo);
  } else {
    cb && (await cb());
    return null;
  }
};

export const homeLoader = () => authLoader(false, "/login", () => store.dispatch(authUserThunk()));
export const loginLoader = () => authLoader(true, "/");
