import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let chatSession: Chat | null = null;

const apiKey = process.env.API_KEY;

export const initializeChat = async () => {
  if (!apiKey) {
    console.warn("API Key not found. Chat functionality will be disabled.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    return chatSession;
  } catch (error) {
    console.error("Failed to initialize chat:", error);
    return null;
  }
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    // Attempt lazy initialization
    const session = await initializeChat();
    if (!session) {
        return "I'm sorry, I cannot connect to the GreenAI intelligence network right now. Please check your API key configuration.";
    }
  }

  try {
    if (chatSession) {
        const result = await chatSession.sendMessage({ message });
        return result.text || "I processed that, but couldn't generate a text response.";
    }
    return "Chat session invalid.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered an error analyzing your request. Please try again.";
  }
};