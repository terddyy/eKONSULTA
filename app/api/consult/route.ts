import { NextRequest, NextResponse } from 'next/server';
import { getAIDoctorResponse, ChatMessage } from '@/lib/genAI';

/**
 * API route handler for chat consultations
 * Receives messages from the client and returns AI responses
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    // Validate the request
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      console.error('Invalid request: messages array is missing or empty');
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      );
    }

    // Log messages for debugging
    console.log(`Processing ${messages.length} messages`);
    
    // Get the AI response
    try {
      const aiResponse = await getAIDoctorResponse(messages);
      
      // Return the AI response
      return NextResponse.json({ response: aiResponse });
    } catch (aiError: any) {
      console.error('Error getting AI response:', aiError);
      const message = aiError?.message || 'Unknown AI error';
      const name = aiError?.name || 'AIError';
      const status = typeof aiError?.status === 'number' ? aiError.status : 500;
      const details = typeof aiError === 'object' ? JSON.stringify(aiError, Object.getOwnPropertyNames(aiError)) : String(aiError);
      return NextResponse.json(
        { error: message, name, details },
        { status }
      );
    }
  } catch (error) {
    console.error('Error in /api/consult route:', error);
    const message = (error as any)?.message || 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
} 