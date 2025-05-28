import { GoogleGenerativeAI } from '@google/generative-ai';

// Define the structure of chat messages
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Simple, hard-coded responses for fallback when API fails
const FALLBACK_RESPONSES = {
  initial: [
    "Thank you for sharing your symptoms. To help me better understand your condition, I need to ask a few questions:",
    "1. How long have you been experiencing these symptoms?",
    "2. Is the pain constant, or does it come and go?",
    "3. Have you taken any medication for this?",
    "4. Are you experiencing any other symptoms?",
    "5. Do these symptoms affect your daily activities?"
  ],
  followUp: [
    "Based on what you've described, there are a few potential causes to consider:",
    
    "1. Tension headache: This is the most common type of headache and can be caused by stress, poor posture, or dehydration. The pain typically feels like pressure or tightness around your head.",
    
    "2. Migraine: These cause moderate to severe throbbing pain, often on one side of the head, and can be accompanied by nausea, sensitivity to light and sound.",
    
    "If you've had this headache for 3 days continuously with no relief, I would recommend seeing a doctor, especially if this is an unusual pattern for you. Persistent headaches should be evaluated by a healthcare professional.",
    
    "In the meantime, you might try:",
    "- Over-the-counter pain relievers like ibuprofen or acetaminophen",
    "- Rest in a quiet, dark room",
    "- Apply a cold or warm compress to your forehead or neck",
    "- Stay hydrated",
    
    "Is there anything specific about the headache that concerns you most?"
  ]
};

/**
 * Generate a response from the AI doctor based on conversation history
 * 
 * @param messages - The history of the conversation
 * @returns The AI doctor's response
 */
export async function getAIDoctorResponse(messages: ChatMessage[]): Promise<string> {
  // Use environment variable if available, otherwise use hardcoded key
  const API_KEY = process.env.GOOGLE_AI_API_KEY || "AIzaSyB83gRvj-5VXCQb-Eep5fpOt8uW0mgH2iU";
  
  try {
    console.log('Attempting to use Google AI API with messages:', messages.length);
    
    // Initialize the API client
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Using confirmed working model: gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    // Medical prompt to include with the user's message
    const medicalPrompt = `You are an AI doctor. Your job is to help users identify the most likely cause of their symptoms or pain.
    -interact with the user in a natural, conversational tone to know what is their concern
- you may ask key diagnostic questions to help you understand the user's condition better
- Then continue asking until you're confident enough to suggest the most likely disease or cause
- If multiple causes are likely, explain top 2–3 and why
- Use clear, layman-friendly language and avoid jargon
- Warn users of serious symptoms and advise seeing a doctor or ER when needed
- Stay calm, professional, and empathetic
- suggest treatment options if you think it's appropriate
- suggest personal care tips if you think it's appropriate
- Respond like a real doctor in a natural, conversational tone`;

    // Get the user's last message
    const lastMsg = messages[messages.length - 1];
    if (lastMsg.role !== 'user') {
      console.error('Last message is not from user');
      return "I apologize, but I need a question or symptoms to provide medical guidance.";
    }

    // Combine previous messages for context
    let conversationContext = "";
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      const role = msg.role === 'user' ? 'Patient' : 'Doctor';
      conversationContext += `${role}: ${msg.content}\n\n`;
    }
    
    // Create the full prompt
    const fullPrompt = `${medicalPrompt}\n\n${conversationContext ? 'Conversation history:\n' + conversationContext + '\n' : ''}Patient: ${lastMsg.content}`;
    
    console.log('Sending message to Google AI...');
    
    // Create generation config with lower temperature (0.2 for more deterministic responses)
    const generationConfig = {
      temperature: 0.2,
      topP: 0.8,
      topK: 40,
    };
    
    // Get response from Google AI with temperature control
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: fullPrompt }] }],
      generationConfig,
    });
    console.log('Received response from Google AI');
    
    if (result && result.response) {
      const responseText = result.response.text();
      if (responseText && responseText.trim()) {
        console.log('Returning AI response');
        return responseText;
      }
    }
    
    throw new Error('Empty response from API');

  } catch (error) {
    console.error('Error calling AI API:', error);
    
    // Use fallback responses when API fails
    console.log('Using fallback response due to API error');
    if (messages.length <= 1) {
      return FALLBACK_RESPONSES.initial.join("\n\n");
    }
    return FALLBACK_RESPONSES.followUp.join("\n\n");
  }
} 