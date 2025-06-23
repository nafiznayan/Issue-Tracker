//prisma/client.ts
// This file initializes a Prisma Client instance and ensures that it is reused in development mode to avoid exhausting database connections.
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
