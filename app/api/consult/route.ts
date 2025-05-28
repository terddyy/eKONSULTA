import { NextRequest, NextResponse } from 'next/server';
import { getAIDoctorResponse, ChatMessage } from '@/lib/googleAI';

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
    } catch (aiError) {
      console.error('Error getting AI response:', aiError);
      return NextResponse.json(
        { error: 'Error getting AI response', details: String(aiError) },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in /api/consult route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
} 