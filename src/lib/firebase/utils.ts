import { auth, storage } from "./init";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

// authentication

export const getCurrentUser = async () => {
  await auth.authStateReady();
  let user = null;

  if (auth.currentUser) {
    user = auth.currentUser;
  }

  return user;
};

export const isAuthState = async () => {
  await auth.authStateReady();
  return auth.currentUser ? true : false;
};

// storage pictures

export const uploadPicture = async (collection: string, picture: any, id: string) => {
  if (!picture || !id) return null;

  const photoRef = ref(storage, `pictures/${collection}/${id}`);
  await uploadBytes(photoRef, picture);
  return await getDownloadURL(photoRef);
};

export const deletePicture = async (category: string, id: string) => {
  const pictureRef = ref(storage, `pictures/${category}/${id}`);
  try {
    deleteObject(pictureRef);
  } catch (error) {
    console.log(error);
  }
};
