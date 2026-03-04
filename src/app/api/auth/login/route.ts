import { login } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { user, token } = await login(email, password);

    const response = Response.json({ user });
    const headers = new Headers(response.headers);
    headers.set(
      'Set-Cookie',
      `bakedesk_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );

    return new Response(response.body, { status: 200, headers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Login failed';
    return Response.json({ error: message }, { status: 401 });
  }
}
