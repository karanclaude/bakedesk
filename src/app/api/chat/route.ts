import Anthropic from '@anthropic-ai/sdk';
import { buildSystemPrompt } from '@/lib/system-prompt';

export const runtime = 'nodejs';
export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { messages, preferences } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        {
          error:
            'API key not configured. Add ANTHROPIC_API_KEY to your .env.local file.',
        },
        { status: 500 }
      );
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: 'Messages are required.' }, { status: 400 });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const systemPrompt = buildSystemPrompt(preferences);

    const stream = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
      stream: true,
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === 'content_block_delta' &&
              event.delta.type === 'text_delta'
            ) {
              controller.enqueue(encoder.encode(event.delta.text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return Response.json({ error: message }, { status: 500 });
  }
}
