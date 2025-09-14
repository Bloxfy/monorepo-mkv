import { startInMemoryMongo, clearDatabase, stopInMemoryMongo, prisma as client, prisma, mongoServer } from './test-utils';

describe('test-utils', () => {

  it('should not throw if stopInMemoryMongo is called before start', async () => {
    await expect(stopInMemoryMongo()).resolves.not.toThrow();
  });

  
  it('should start and connect to in-memory MongoDB', async () => {
    const dbClient = await startInMemoryMongo();
    expect(dbClient).toBe(client);
  });

  it('should clear database without errors', async () => {
    await clearDatabase();
  });


  it('should disconnect and stop server', async () => {
    await stopInMemoryMongo();
  });

  it('should return undefined when prisma is not initialized', async () => {
    await clearDatabase();
    expect(prisma).toBeUndefined();
    expect(client).toBeUndefined();
  });

  it('should return undefined when mongoServer is not initialized', async () => {
    await stopInMemoryMongo();
    expect(mongoServer).toBeUndefined();
  });
}); 