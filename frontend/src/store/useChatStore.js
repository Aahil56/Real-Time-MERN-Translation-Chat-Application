import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isTranslating: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // Automatically translate the message after sending
      const translatedMessage = { ...res.data };
      if (translatedMessage.text) {
        // For sender: If not English, translate to English
        // For receiver: If English, translate to Hindi
        const translatedText = await get().translateMessage(
          translatedMessage.text,
          "auto" // This will let the backend decide the target language
        );
        if (translatedText) {
          translatedMessage.translatedText = translatedText;
        }
      }

      set({ messages: [...messages, translatedMessage] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", async (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      // Automatically translate new incoming messages
      if (newMessage.text) {
        const translatedText = await get().translateMessage(
          newMessage.text,
          "auto" // This will let the backend decide the target language
        );
        if (translatedText) {
          newMessage.translatedText = translatedText;
        }
      }

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  translateMessage: async (text, targetLanguage) => {
    set({ isTranslating: true });
    try {
      console.log("Sending translation request:", { text, targetLanguage });

      const res = await axiosInstance.post("/translate", {
        text,
        targetLanguage,
      });

      console.log("Translation response:", res.data);

      if (!res.data.translatedText) {
        throw new Error("No translation received");
      }

      const { messages } = get();
      const updatedMessages = messages.map((msg) => {
        if (msg.text === text) {
          return {
            ...msg,
            translatedText: res.data.translatedText,
            detectedLanguage: res.data.detectedLanguage,
          };
        }
        return msg;
      });

      set({ messages: updatedMessages });
      return res.data.translatedText;
    } catch (error) {
      console.error("Translation error:", error);
      console.error("Error details:", error.response?.data);
      toast.error(error.response?.data?.error || "Translation failed");
      return null;
    } finally {
      set({ isTranslating: false });
    }
  },
}));
