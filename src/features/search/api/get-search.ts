import { useEffect, useState } from "react";
import { searchChatQuery, searchUserQuery } from "../utils/queries";
import { transformSearchItems } from "../utils/transformSearchItem";
import { useAppDispatch, useAppSelector } from "@/store";
import { searchSlice } from "../store";
import { authSlice } from "@/features/auth";
import { useQueryData } from "./get-query-data";
import { SearchItemType } from "../types";

export const useSearch = () => {
  const [search, setSearch] = useState<string>("");
  const [chats, setChats] = useState<SearchItemType[]>([]);
  const [userData, setUserQuery] = useQueryData(searchUserQuery);
  const [chatData, setChatQuery] = useQueryData(searchChatQuery);

  const dispatch = useAppDispatch();
  const authUser = useAppSelector(authSlice.selectors.selectFullUser);

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserQuery(search);
      setChatQuery(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const transformedUserData = transformSearchItems("personal", userData);
    const userDataResult = transformedUserData.filter(el => el.id !== authUser?.id);
    const transformedChatData = transformSearchItems("group", chatData);
    const chatDataResult = transformedChatData.filter(el => !authUser?.chats.includes(el.id));
    const result = [...userDataResult, ...chatDataResult];

    setChats(result);
    dispatch(searchSlice.actions.setResult(search.trim() !== "" ? result : null));
  }, [userData, chatData]);

  return { setSearch, search, chats, userData };
};
