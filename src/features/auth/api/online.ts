import { auth, db } from "@/lib/firebase/init";
import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { FullChatType } from "@/features/chats";
import { isAuthState } from "@/lib/firebase/utils";

export const useConnectOnline = () => {
  useEffect(() => {
    (async () => {
      if ((await isAuthState()) === false) return;

      const userRef = ref(db, "users/" + auth.currentUser?.uid + "/online");

      onValue(ref(db, ".info/connected"), snap => {
        if (snap.val() === true) {
          set(userRef, true);
        } else {
          onDisconnect(userRef).set(false);
        }
      });
    })();
  }, []);
};

export const useChatOnline = (chat: FullChatType | null) => {
  const [online, setOnline] = useState(false);

  useEffect(() => {
    if (chat !== null && chat.title !== "" && chat.users.length === 1) {
      const onlineRef = ref(db, "users/" + chat.users[0].id + "/online");

      const unsub = onValue(onlineRef, snapshot => setOnline(snapshot.val()));

      return () => unsub();
    }
  }, [chat]);

  return online;
};

export const postOnline = async (isOnline: boolean) => {
  if ((await isAuthState()) === false) return;
  set(ref(db, "users/" + auth.currentUser?.uid + "/online"), isOnline);
};
