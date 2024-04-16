import React, { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

      if (!userInfo) {
        // history.push("/login");
        history.push("/");
      }
    } catch (error) {
      setError(error);
    }
  }, [history]);
  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

//export default ChatProvider;
export { ChatProvider, ChatContext };
