import { useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { QueryFunctionType, QueryReturnType } from "../utils/queries";
import { DocumentData, FirestoreError, QuerySnapshot } from "firebase/firestore";

type UseQueryDataReturnType = [
  QuerySnapshot<DocumentData, DocumentData> | undefined,
  (search: string) => void,
  boolean,
  FirestoreError | undefined
];

export const useQueryData = (getQuery: QueryFunctionType) => {
  const [query, setQuery] = useState<QueryReturnType>(null);
  const [data, isLoading, error] = useCollection(query);

  const setSearchQuery = (search: string) => setQuery(getQuery(search));

  return <UseQueryDataReturnType>[data, setSearchQuery, isLoading, error];
};
