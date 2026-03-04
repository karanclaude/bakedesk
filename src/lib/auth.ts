import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from './db';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'bakedesk-dev-secret';
const TOKEN_COOKIE = 'bakedesk_token';
const TOKEN_EXPIRY = '30d';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function createToken(user: AuthUser): string {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
  });
}

export function verifyToken(token: string): AuthUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

export async function getAuthUser(): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function signup(email: string, password: string, name?: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error('Email already registered');

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, passwordHash, name: name || null },
  });

  // Create default preferences
  await prisma.userPreferences.create({
    data: { userId: user.id },
  });

  const authUser: AuthUser = { id: user.id, email: user.email, name: user.name };
  const token = createToken(authUser);
  return { user: authUser, token };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('Invalid email or password');

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) throw new Error('Invalid email or password');

  const authUser: AuthUser = { id: user.id, email: user.email, name: user.name };
  const token = createToken(authUser);
  return { user: authUser, token };
}
