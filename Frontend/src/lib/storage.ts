import { ChatSession } from "@/types/chat";

const STORAGE_KEY = "vit_chennai_chat_sessions";

export const chatStorage = {
  getSessions(): ChatSession[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return [];
      
      const sessions = JSON.parse(stored);
      // Convert date strings back to Date objects
      return sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        })),
      }));
    } catch (error) {
      console.error("Error loading chat sessions:", error);
      return [];
    }
  },

  saveSession(session: ChatSession): void {
    try {
      const sessions = this.getSessions();
      const existingIndex = sessions.findIndex((s) => s.id === session.id);
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.push(session);
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    } catch (error) {
      console.error("Error saving chat session:", error);
    }
  },

  deleteSession(sessionId: string): void {
    try {
      const sessions = this.getSessions();
      const filtered = sessions.filter((s) => s.id !== sessionId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting chat session:", error);
    }
  },

  clearAllSessions(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error clearing chat sessions:", error);
    }
  },
};
