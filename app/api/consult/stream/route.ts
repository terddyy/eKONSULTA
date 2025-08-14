import { NextRequest } from 'next/server';
import { getAIDoctorResponse, ChatMessage } from '@/lib/genAI';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body as { messages: ChatMessage[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid request: messages array is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      });
    }

    // Get full text first, then stream it in small chunks
    const fullText = await getAIDoctorResponse(messages);

    const encoder = new TextEncoder();

    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        // Stream word-like chunks to simulate token flow
        const words = fullText.split(/(\s+)/); // keep spaces
        let index = 0;

        function push() {
          if (index >= words.length) {
            controller.close();
            return;
          }
          const chunk = words[index++];
          controller.enqueue(encoder.encode(chunk));
          // Small delay to create typing feel without long server execution
          setTimeout(push, 10);
        }

        push();
      },
    });

    return new Response(stream, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store',
        // Allow streaming in some proxies
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error: any) {
    const message = error?.message || 'Internal server error';
    return new Response(JSON.stringify({ error: message }), {
      status: error?.status && Number.isInteger(error.status) ? error.status : 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
} 