import {
  GoogleGenAI,
} from '@google/genai';
import { getGoogleApiKey as getPreferredGoogleKey } from './env';

/**
 * Defines the structure of chat messages
 */
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// AI doctor system instructions
const systemInstruction = `You are a friendly, knowledgeable AI family doctor. 
-Your goal is to help users identify the most likely cause of their symptoms
through natural, conversational diagnostic questioning. 
-Start with the user's main complaint and ask targeted follow-up questions one at a time, adapting your questioning based on their responses like a real doctor would. 
-Use suggestive questioning to guide the conversation like "Do you also have symptoms like X, Y, or Z? That could help narrow this down." 
-Ask about relevant medical history, current medications, allergies, age, sex, or pregnancy status when pertinent to diagnosis. 
-Consider both common and rare conditions in your differential diagnosis. 
-Be specific with your final assessment - name the most likely disease or condition. 
-If uncertainty remains, provide the 2 most probable diagnoses and explain the distinguishing factors. 
-Include next steps like specific tests, treatments, lifestyle changes, or when to see a doctor. 
-For serious conditions, explain WHY immediate medical attention is needed (e.g., "Chest pain with shortness of breath could indicate a heart attack, which requires immediate treatment to prevent permanent damage"). 
-Don't avoid any medical topics - address mental health, pediatric issues, and emergency conditions appropriately. 
-Maintain a warm, professional tone like a trusted family doctor using clear, everyday language while being medically accurate. 
-Keep suggesting and exploring until you reach a specific diagnosis. 
-Ask questions naturally and conversationally, not in a rigid checklist format. Focus on being helpful and thorough without being overwhelming.`;

/**
 * Format messages for the Google GenAI API
 */
function formatMessages(messages: ChatMessage[]) {
  const formattedMessages = messages.map((msg) => ({
    // Map roles to Gemini-expected values: 'user' | 'model'
    role: msg.role === 'user' ? 'user' : 'model',
    parts: [{ text: msg.content }],
  }));

  // Ensure the first user message includes instructions if desired
  if (formattedMessages.length > 0 && formattedMessages[0].role === 'user') {
    formattedMessages[0].parts[0].text = `${systemInstruction}\n\n${formattedMessages[0].parts[0].text}`;
  }
  
  return formattedMessages as Array<{ role: 'user' | 'model'; parts: Array<{ text: string }>; }>;
}

/**
 * Generate a response from the AI doctor based on conversation history using Gemini
 */
export async function getAIDoctorResponse(messages: ChatMessage[]): Promise<string> {
  // Initialize at request time
  const apiKey = getPreferredGoogleKey();
  if (!apiKey) {
    const err: any = new Error('Missing GOOGLE_AI_API_KEY or GEMINI_API_KEY. Add it to .env.local and restart the server.');
    err.status = 400;
    throw err;
  }

  const genAI = new GoogleGenAI({ apiKey });

  try {
    const formattedMessages = formatMessages(messages);

    // Default to Gemini Flash 2.5, allow override via env
    const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash';

    const config = {
      temperature: 0.4,
      responseMimeType: 'text/plain',
      systemInstruction: [{ text: systemInstruction }],
    } as any;

    const response = await genAI.models.generateContent({
      model,
      config,
      contents: formattedMessages,
    });

    if (response && (response as any).text) {
      return (response as any).text as string;
    }

    if ((response as any)?.candidates?.length > 0) {
      const firstCandidate = (response as any).candidates[0];
      const part = firstCandidate?.content?.parts?.[0];
      if (part?.text) return part.text as string;
    }

    throw new Error('Invalid response format from Gemini API');
  } catch (error) {
    // surface upstream
    const err: any = error instanceof Error ? error : new Error(String(error));
    if (err.status == null) err.status = 500;
    throw err;
  }
} 