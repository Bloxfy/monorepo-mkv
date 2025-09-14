jest.mock('bcrypt', () => ({
  hash: jest.fn(async () => 'hashedpassword'),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let mockPrismaService: any;
  let userMock: any;


  beforeEach(async () => {
    userMock = {
      id: '1',
      email: 'test@test.com',
      password: 'password',
      name: 'John Doe',
      lastName: 'Doe',
    };
    mockPrismaService = {
      prisma: {
        user: {
          findUnique: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, {
        provide: PrismaService,
        useValue: mockPrismaService,
      }],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue(null);
    mockPrismaService.prisma.user.create.mockResolvedValue(userMock);
  
    const { userId, ...user } = userMock;
    const newUser = await service.createUser(user);
  
    expect(newUser).toEqual(userMock);
    expect(mockPrismaService.prisma.user.create).toHaveBeenCalledWith({
      data: { ...user, password: 'hashedpassword' },
    });
  });
  
  it('should throw ConflictException if email already exists', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue(userMock);
  
    await expect(
      service.createUser({ email: 'test@test.com', password: '123', name: 'John Doe', lastName: 'Doe' }),
    ).rejects.toThrow(ConflictException);
  });

  it('should throw an error if the user is not found in privateGetUser', async () => {
    mockPrismaService.prisma.user.findUnique = jest.fn().mockResolvedValue(null);
    await expect(service['privateGetUser'](userMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should update a user successfully', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue({ id: '1' });
    mockPrismaService.prisma.user.update.mockResolvedValue({ ...userMock, name: 'Updated' });
  
    const updated = await service.updateUser('1', { name: 'Updated' });
    expect(updated.name).toBe('Updated');
  });
  
  it('should throw BadRequestException if no fields to update', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue({ id: '1' });
    await expect(service.updateUser('1', {})).rejects.toThrow(BadRequestException);
  });
  

  it('should throw error if user is not found in deleteUser', async () => {
    mockPrismaService.prisma.user.findUnique = jest.fn().mockResolvedValue(null);
    await expect(service.deleteUser(userMock.id)).rejects.toThrow(NotFoundException);
  });

  it('should get me', async () => {
    const user = await service.getMe(userMock);
    expect(user).toBeDefined();
  });

  it('should return user by id', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue({ id: '1' });
  
    const user = await service.getUser('1');
  
    expect(user).toEqual({
      id: '1',
      name: undefined,
      email: undefined,
    });
  });
  
  it('should throw NotFoundException if user does not exist', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue(null);
  
    await expect(service.getUser('999')).rejects.toThrow(NotFoundException);
  });

  it('should delete a user', async () => {
    mockPrismaService.prisma.user.findUnique.mockResolvedValue({ id: '1' });
    const deleted = { ...userMock, deletedAt: new Date() };
    mockPrismaService.prisma.user.update.mockResolvedValue(deleted);
  
    const result = await service.deleteUser('1');
    expect(result.deletedAt).toBeDefined();
  });
  

});
