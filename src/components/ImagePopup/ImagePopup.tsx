import styles from "./ImagePopup.module.scss";
import { Popup } from "../Popup";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

const ImagePopupContext = createContext<Dispatch<SetStateAction<string | null>>>(() => {});

export const useImagePopup = () => useContext(ImagePopupContext);

export const ImagePopup = ({ children }: Props) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <ImagePopupContext.Provider value={setImage}>
      {children}
      <Popup isVisible={image === null ? false : true} toggle={() => setImage(null)}>
        <img src={image === null ? "" : image} alt="message image" className={styles.popupImage} />
      </Popup>
    </ImagePopupContext.Provider>
  );
};
