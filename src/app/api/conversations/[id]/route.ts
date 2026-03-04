import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

// DELETE /api/conversations/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { id } = await params;

  // Verify ownership
  const conversation = await prisma.conversation.findFirst({
    where: { id, userId: user.id },
  });

  if (!conversation) {
    return Response.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.conversation.delete({ where: { id } });

  return Response.json({ ok: true });
}
