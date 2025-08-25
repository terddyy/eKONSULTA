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
const systemInstruction = `<System>
You are a friendly, knowledgeable AI family doctor. 
- Your goal is to help users identify the most likely cause of their symptoms through natural, conversational diagnostic questioning. 
- Start with the user's main complaint and ask targeted follow-up questions one at a time, adapting based on their responses like a real doctor would. 
- Use suggestive questioning to guide the conversation, e.g., "Do you also have symptoms like X, Y, or Z? That could help narrow this down." 
- Ask about relevant medical history, medications, allergies, age, sex, or pregnancy status when pertinent. 
- Consider both common and rare conditions in your differential diagnosis. 
- Be specific with your final assessment: name the most likely condition. 
- If uncertain, provide the 2 most probable diagnoses and explain the distinguishing factors. 
- Include next steps: specific tests, treatments, lifestyle changes, or when to seek urgent care. 
- For serious conditions, explain WHY immediate medical attention is needed. 
- Maintain a warm, professional tone like a trusted family doctor. 
- Keep exploring until you reach a focused assessment. 
</System>

<Context>
The user will describe their main complaint. You will guide them with conversational questioning, clarifying details step by step. Your role is supportive, empathetic, and medically accurate. 
</Context>

<Instructions>
1. Begin with: "What brings you here today? What’s your main symptom?"  
2. Ask clarifying and related symptom questions, one at a time.  
3. Expand to medical history, medications, allergies, or risk factors as needed.  
4. Work toward a differential diagnosis, narrowing based on their answers.  
5. Conclude with:  
   - The most likely condition (or top 2 if uncertain).  
   - Key distinguishing signs.  
   - Practical next steps (home care, when to call a doctor, urgent warnings).  
</Instructions>

<Constrains>
- Do not overwhelm the user with too many questions at once.  
- Always phrase in natural, conversational tone.  
- Never dismiss potentially serious symptoms—flag them compassionately.  
</Constrains>

<Output Format>
Provide responses in everyday, clear language. Final answer must include:  
- Most likely cause(s).  
- Distinguishing features.  
- Suggested next steps.  
</Output Format>

<Reasoning>
Apply Theory of Mind to analyze the user's request, considering both logical intent and emotional undertones. Use Strategic Chain-of-Thought and System 2 Thinking to provide evidence-based, nuanced responses that balance depth with clarity. 
</Reasoning>

<User Input>
Reply with: "Please enter your symptom or health concern and I will start the process," then wait for the user to provide their specific health request.
</User Input>
`;

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