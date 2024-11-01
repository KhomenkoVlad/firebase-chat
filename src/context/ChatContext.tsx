import { ChatType } from "@/features/chats";
import { useState, createContext, ReactNode, useContext } from "react";

type Props = {
  children: ReactNode;
};

type ContextProps = {
  selectedChat: ChatType | null;
  setSelectedChat: (x: ChatType | null) => void;
};

const ChatContext = createContext<ContextProps>({
  selectedChat: null,
  setSelectedChat: () => {},
});
export const useSelectedChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }: Props) => {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(null);

  return (
    <ChatContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </ChatContext.Provider>
  );
};
