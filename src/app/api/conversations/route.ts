import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/conversations — list user's conversations
export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return Response.json({ conversations: [] });
  }

  const conversations = await prisma.conversation.findMany({
    where: { userId: user.id },
    orderBy: { updatedAt: 'desc' },
    take: 50,
    include: {
      messages: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  return Response.json({
    conversations: conversations.map((c) => ({
      id: c.id,
      title: c.title,
      messages: c.messages.map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.createdAt.getTime(),
      })),
      createdAt: c.createdAt.getTime(),
      updatedAt: c.updatedAt.getTime(),
    })),
  });
}

// POST /api/conversations — save/update a conversation
export async function POST(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id, title, messages } = await req.json();

  if (!id || !messages || !Array.isArray(messages)) {
    return Response.json({ error: 'Invalid data' }, { status: 400 });
  }

  // Upsert conversation
  const conversation = await prisma.conversation.upsert({
    where: { id },
    create: {
      id,
      title: title || 'New Conversation',
      userId: user.id,
    },
    update: {
      title: title || undefined,
      updatedAt: new Date(),
    },
  });

  // Get existing message IDs
  const existingMessages = await prisma.message.findMany({
    where: { conversationId: conversation.id },
    select: { id: true },
  });
  const existingIds = new Set(existingMessages.map((m) => m.id));

  // Insert only new messages
  const newMessages = messages.filter(
    (m: { id: string }) => !existingIds.has(m.id)
  );

  if (newMessages.length > 0) {
    await prisma.message.createMany({
      data: newMessages.map((m: { id: string; role: string; content: string }) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        conversationId: conversation.id,
      })),
    });
  }

  return Response.json({ ok: true, id: conversation.id });
}
