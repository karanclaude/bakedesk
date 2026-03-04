import { getAuthUser } from '@/lib/auth';
import { prisma } from '@/lib/db';

// GET /api/preferences
export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return Response.json({ preferences: null });
  }

  const prefs = await prisma.userPreferences.findUnique({
    where: { userId: user.id },
  });

  if (!prefs) {
    return Response.json({
      preferences: {
        businessType: '',
        businessName: '',
        location: '',
        currency: 'INR',
        stage: '',
      },
    });
  }

  return Response.json({
    preferences: {
      businessType: prefs.businessType,
      businessName: prefs.businessName,
      location: prefs.location,
      currency: prefs.currency,
      stage: prefs.stage,
    },
  });
}

// PUT /api/preferences
export async function PUT(req: Request) {
  const user = await getAuthUser();
  if (!user) {
    return Response.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const data = await req.json();

  await prisma.userPreferences.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      businessType: data.businessType || '',
      businessName: data.businessName || '',
      location: data.location || '',
      currency: data.currency || 'INR',
      stage: data.stage || '',
    },
    update: {
      businessType: data.businessType ?? undefined,
      businessName: data.businessName ?? undefined,
      location: data.location ?? undefined,
      currency: data.currency ?? undefined,
      stage: data.stage ?? undefined,
    },
  });

  return Response.json({ ok: true });
}
