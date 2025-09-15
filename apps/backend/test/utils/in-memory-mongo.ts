import { MongoMemoryReplSet } from 'mongodb-memory-server';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

export let mongoServer: MongoMemoryReplSet | undefined;
export let prisma: PrismaClient | undefined;

export async function startInMemoryMongo() {
    mongoServer = await MongoMemoryReplSet.create({
        replSet: { count: 1, storageEngine: 'wiredTiger' }
    });
    const uri = mongoServer.getUri('test');
    // append '/test' to ensure a valid database namespace
    process.env.DATABASE_URL = uri;
    console.log(process.env.DATABASE_URL);
    execSync(
        `DATABASE_URL=${process.env.DATABASE_URL} pnpm run db:push`,
        { stdio: 'inherit' }
      );
      prisma = new PrismaClient();
      await prisma.$connect();

    const stopServer = async () => {
        if (mongoServer && prisma) {
            await prisma.$disconnect();
            await mongoServer.stop();
            return Promise.resolve();
        }
        return Promise.resolve();
    };

    return { prisma , stopServer };
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
