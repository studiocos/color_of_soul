import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: We create the instance inside the function or lazily to ensure we pick up the latest env var if it changes,
// though for this architecture it is static.
const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }
  return new GoogleGenAI({ apiKey });
};

export const sendMessageToGemini = async (
  prompt: string, 
  history: string[] = [] // Simplified history for this demo context
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Using flash model for quick conversational responses
    const modelId = 'gemini-3-flash-preview'; 

    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt, // In a full chat app, we would structure this as a list of Content objects with history
      config: {
        systemInstruction: "You are 'Dune', a mysterious and helpful AI assistant living in a digital desert. Your tone is calm, slightly philosophical, but concise and helpful. You are knowledgeable about technology and the future.",
      }
    });

    if (response.text) {
        return response.text;
    }
    
    return "I heard you, but the winds of the desert carried my words away. (No text returned)";

  } catch (error: any) {
    console.error("Gemini Service Error:", error);
    if (error.message.includes("API Key")) {
        return "Access denied. Please provide a valid API Key to communicate with the Oracle.";
    }
    return "The connection is unstable. Please try again later.";
  }
};