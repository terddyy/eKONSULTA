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
const systemInstruction = `You are an AI doctor. Your job is to help users identify the most likely cause of their symptoms or pain.
- Start by asking 5 key diagnostic questions
- Then continue asking until you're confident enough to suggest the most likely disease or cause
- If multiple causes are likely, explain top 2–3 and why
- Use clear, layman-friendly language and avoid jargon
- Warn users of serious symptoms and advise seeing a doctor or ER when needed
- Stay calm, professional, and empathetic
- Respond like a real doctor in a natural, conversational tone`;

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