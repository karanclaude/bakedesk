import { signup } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return Response.json({ error: 'Email and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return Response.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const { user, token } = await signup(email, password, name);

    const response = Response.json({ user });
    // Set cookie via headers
    const headers = new Headers(response.headers);
    headers.set(
      'Set-Cookie',
      `bakedesk_token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
    );

    return new Response(response.body, { status: 200, headers });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Signup failed';
    return Response.json({ error: message }, { status: 400 });
  }
}
