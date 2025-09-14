import { mockPrismaClient, mockPrismaService } from './mock';

describe('mockPrismaClient', () => {
  it('should have jest function mocks for user delegate', () => {
    expect(mockPrismaClient.user.findUnique).toBeDefined();
    expect(typeof mockPrismaClient.user.findUnique).toBe('function');
  });
});

describe('mockPrismaService', () => {
  it('should expose prisma property as mockPrismaClient', () => {
    expect(mockPrismaService.prisma).toBe(mockPrismaClient);
  });
}); 