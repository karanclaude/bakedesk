import { PrismaClient } from '@/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import path from 'path';

const dbPath = process.env.DATABASE_URL?.replace('file:', '') || './prisma/dev.db';
const absoluteDbPath = path.isAbsolute(dbPath) ? dbPath : path.join(process.cwd(), dbPath);

const globalForPrisma = globalThis as unknown as { prisma: InstanceType<typeof PrismaClient> };

function createPrismaClient() {
  const adapter = new PrismaBetterSqlite3({ url: `file:${absoluteDbPath}` });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
