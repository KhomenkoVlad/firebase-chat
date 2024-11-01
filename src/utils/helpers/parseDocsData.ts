import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from "firebase/firestore";

const parseDocsData = <T>(
  docs:
    | QueryDocumentSnapshot<DocumentData, DocumentData>[]
    | DocumentSnapshot<DocumentData, DocumentData>[]
    | undefined
) => {
  const data: T[] = [];

  if (docs) {
    docs.forEach(doc =>
      data.push({
        id: doc.id,
        ...(doc.data() as T),
      })
    );
  }

  return data;
};

export default parseDocsData;
