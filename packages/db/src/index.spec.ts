import { PrismaClient } from '@prisma/client';

// Para resetar o cache do módulo entre os testes
const loadDb = () => require('./index'); // ajuste o path conforme seu arquivo

describe('Prisma singleton', () => {
  let originalEnv: string | undefined;

  beforeAll(() => {
    originalEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    // Limpa o require cache para forçar reload do módulo
    jest.resetModules();
    // Limpa global
    // @ts-expect-error
    delete global.prisma;
  });

  afterAll(() => {
    process.env.NODE_ENV = originalEnv;
  });

  it('should create a PrismaClient instance', () => {
    process.env.NODE_ENV = 'test';
    const { prisma } = loadDb();

    expect(prisma).toBeDefined();
    expect(typeof prisma.$connect).toBe('function');
    expect(typeof prisma.$disconnect).toBe('function');
  });

  it('should attach prisma to global in non-production env', () => {
    process.env.NODE_ENV = 'development';
    const { prisma } = loadDb();

    // @ts-expect-error
    expect(global.prisma).toBe(prisma);
  });

  it('should not attach prisma to global in production', () => {
    process.env.NODE_ENV = 'production';
    const { prisma } = loadDb();

    // @ts-expect-error
    expect(global.prisma).toBeUndefined();
    expect(prisma).toBeDefined();
    expect(typeof prisma.$connect).toBe('function');
    expect(typeof prisma.$disconnect).toBe('function');
  });
});
