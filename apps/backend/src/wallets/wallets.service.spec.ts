jest.mock('bcrypt', () => ({
  hash: jest.fn(async () => 'hashedpassword'),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { WalletsService } from './wallets.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';

describe('WalletsService', () => {
  let service: WalletsService;
  let mockPrismaService: any;
  let userMock: any;
  let serviceUserMock: any;

  beforeEach(async () => {
    userMock = {
      id: '1',
      email: 'test@test.com',
      password: 'password',
      name: 'John Doe',
      lastName: 'Doe',
    };
    serviceUserMock = {
      getUser: jest.fn(),
    };
    mockPrismaService = {
        wallet: {
          findUnique: jest.fn(),
          create: jest.fn(),
          update: jest.fn(),
          delete: jest.fn(),
        },
        user: {
          findUnique: jest.fn(),
          update: jest.fn(),
        },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletsService, 
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: UsersService, useValue: serviceUserMock }
      ],
    }).compile();

    service = module.get<WalletsService>(WalletsService);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new wallet', async () => {
    serviceUserMock.getUser.mockResolvedValue(userMock);
    mockPrismaService.wallet.create.mockResolvedValue({ name: 'test@test.com', ownerId: userMock.id });
  
    const newUser = await service.createWallet( userMock.id, { name: 'test@test.com' });
  
    expect(newUser).toEqual({ name: 'test@test.com', ownerId: userMock.id });
    expect(mockPrismaService.wallet.create).toHaveBeenCalledWith({
      data: { name: 'test@test.com', ownerId: userMock.id },
    });
  });

  it('should throw an error if the wallet is not found', async () => {
    mockPrismaService.wallet.findUnique = jest.fn().mockResolvedValue(null);
    await expect(service.getWallet('1')).rejects.toThrow(NotFoundException);
  });

  it('should update a wallet successfully', async () => {
    mockPrismaService.wallet.findUnique.mockResolvedValue({ id: '1', ownerId: userMock.id, name: 'wallet' });
    mockPrismaService.wallet.update.mockResolvedValue({ id: '1', name: 'Updated' });
  
    const updated = await service.updateWallet(userMock.id, '1', { name: 'Updated' });
    expect(mockPrismaService.wallet.update).toHaveBeenCalledWith({
      where: { id: '1', deletedAt: null },
      data: { name: 'Updated' },
    });
    expect(updated.name).toBe('Updated');
  });
  
  it('should throw BadRequestException if no fields to update', async () => {
    mockPrismaService.wallet.findUnique.mockResolvedValue({ id: '1', ownerId: '1' });
    await expect(service.updateWallet(userMock.id, '1', {})).rejects.toThrow(BadRequestException);
  });
  

  it('should throw error if wallet is not found in deleteWallet', async () => {
    mockPrismaService.wallet.findUnique = jest.fn().mockResolvedValue(null);
    await expect(service.deleteWallet(userMock.id, '1')).rejects.toThrow(NotFoundException);
  });

  it('should return wallet by id', async () => {
    mockPrismaService.wallet.findUnique.mockResolvedValue({ id: '1', ownerId: userMock.id, name: 'wallet' });
  
    const wallet = await service.getWallet('1');
  
    expect(wallet).toEqual({
      id: '1',
      name: 'wallet',
      ownerId: userMock.id,
    });
  });
  
  it('should throw NotFoundException if user does not exist', async () => {
    mockPrismaService.wallet.findUnique.mockResolvedValue(null);
  
    await expect(service.getWallet('999')).rejects.toThrow(NotFoundException);
  });

  it('should delete a wallet', async () => {
    mockPrismaService.wallet.findUnique.mockResolvedValue({ id: '1', ownerId: userMock.id, name: 'wallet' });
    const deleted = { id: '1', ownerId: userMock.id, name: 'wallet', deletedAt: 'date now' };
    mockPrismaService.wallet.update.mockResolvedValue(deleted);
  
    const result = await service.deleteWallet(userMock.id, '1');
    expect(result).toEqual({ id: '1', ownerId: userMock.id, name: 'wallet', deletedAt: 'date now' });
    expect(mockPrismaService.wallet.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { deletedAt: expect.any(Date) },
    });
  });
  

});
