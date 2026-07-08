import { createContext, useEffect, useState } from "react";
import { clearChat as clearChatAPI } from "../services/chatService";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const getCurrentUser = () => {
    return JSON.parse(
      localStorage.getItem("user") || sessionStorage.getItem("user") || "null",
    );
  };

  const getStorageKey = () => {
    const user = getCurrentUser();

    return user?._id ? `chatHistory_${user._id}` : null;
  };

  const loadMessages = () => {
    const key = getStorageKey();

    if (!key) return [];

    const saved = localStorage.getItem(key);

    return saved ? JSON.parse(saved) : [];
  };

  const [messages, setMessages] = useState(loadMessages);

  const [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  /*
  ==========================================
  Reload Chat When User Changes
  ==========================================
  */

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  /*
  ==========================================
  Save Message
  ==========================================
  */

  const addMessage = (message) => {
    setMessages((prevMessages) => {
      const updatedMessages = [...prevMessages, message];

      const key = getStorageKey();

      if (key) {
        localStorage.setItem(key, JSON.stringify(updatedMessages));
      }

      return updatedMessages;
    });
  };

  /*
  ==========================================
  Clear Chat
  ==========================================
  */

  const clearChat = async () => {
    try {
      await clearChatAPI();
    } catch (error) {
      console.error(error);
    }

    const key = getStorageKey();

    if (key) {
      localStorage.removeItem(key);
    }

    setMessages([]);
  };

  /*
  ==========================================
  Refresh Chat
  (Call this after Login / Logout)
  ==========================================
  */

  const refreshChat = () => {
    setMessages(loadMessages());
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        clearChat,
        refreshChat,
        loading,
        setLoading,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
