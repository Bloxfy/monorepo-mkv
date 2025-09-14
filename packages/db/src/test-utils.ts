import { MongoMemoryServer } from 'mongodb-memory-server';
import { PrismaClient } from '@prisma/client';

export let mongoServer: MongoMemoryServer | undefined;
export let prisma: PrismaClient | undefined;

export async function startInMemoryMongo() {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    // append '/test' to ensure a valid database namespace
    process.env.DATABASE_URL = uri.endsWith('/') ? `${uri}test` : `${uri}/test`;
    prisma = new PrismaClient();
    await prisma.$connect();
    return prisma;
}

export async function stopInMemoryMongo() {
    if (prisma) await prisma.$disconnect();
    if (mongoServer) await mongoServer.stop();
    // reset to uninitialized state
    prisma = undefined;
    mongoServer = undefined;
}

export async function clearDatabase() {
    if (!prisma) return;
    // drop the test database to clear all collections
    await prisma.$runCommandRaw({ dropDatabase: 1 });
}
