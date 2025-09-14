import { PrismaClient } from '@prisma/client';

export const mockPrismaClient = {
  user: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

export const mockPrismaService = {
  prisma: mockPrismaClient as unknown as PrismaClient,
};
