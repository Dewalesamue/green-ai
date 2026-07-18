import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';
import { UserData } from '../types';

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
      model: 'gemini-2.5-flash',
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

export const sendMessageToGemini = async (message: string, userData?: UserData | null): Promise<string> => {
  if (!chatSession) {
    // Attempt lazy initialization
    const session = await initializeChat();
    if (!session) {
        return "I'm sorry, I cannot connect to the GreenAI intelligence network right now. Please check your API key configuration.";
    }
  }

  try {
    if (chatSession) {
        let finalMessage = message;
        if (userData) {
            const context = `[CONTEXT: User Role is ${userData.role}, target is ${userData.target}, primary energy source is ${userData.energySource}. Carbon footprint is ${userData.calculatedEmissions ? `${userData.calculatedEmissions.total} tCO2e (Intensity: ${userData.calculatedEmissions.energyIntensity})` : 'uncalibrated regional baseline'}. Inputs: ${userData.calculatorInputs ? JSON.stringify(userData.calculatorInputs) : 'none'}. Use this to provide highly tailored carbon reduction advice.]`;
            finalMessage = `${context}\nUser says: ${message}`;
        }
        const result = await chatSession.sendMessage({ message: finalMessage });
        return result.text || "I processed that, but couldn't generate a text response.";
    }
    return "Chat session invalid.";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered an error analyzing your request. Please try again.";
  }
};