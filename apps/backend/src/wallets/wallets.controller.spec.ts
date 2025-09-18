import { Test, TestingModule } from '@nestjs/testing';
import { WalletsController } from './wallets.controller';
import { WalletsService } from './wallets.service';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('WalletsController', () => {
  let controller: WalletsController;
  let walletsServiceMock: any;
  let usersServiceMock: any;

  beforeEach(async () => {
    walletsServiceMock = {
      getWallet: jest.fn(),
      createWallet: jest.fn(),
      updateWallet: jest.fn(),
      deleteWallet: jest.fn(),
    };
    usersServiceMock = {
      getUser: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WalletsController],
      providers: [WalletsService, UsersService, {
        provide: WalletsService,
        useValue: walletsServiceMock,
      },
      {
        provide: UsersService,
        useValue: usersServiceMock,
      },
    ],
    }).compile();

    controller = module.get<WalletsController>(WalletsController);
  });

  it('should call getWallet with correct user', async () => {
    const req = { user: { id: '1' }, params: { id: '2' } };
    await controller.getWallet(req);
    expect(walletsServiceMock.getWallet).toHaveBeenCalledWith(req.user.id);
  });

  it('should call createWallet with DTO', async () => {
    const dto = { name: 'Test'};
    const req = { user: { id: '2' } };
    await controller.createWallet(req, dto);
    expect(walletsServiceMock.createWallet).toHaveBeenCalledWith(req.user.id, dto);
  });

  it('should call updateWallet with id and DTO', async () => {
    const dto = { name: 'Updated' };
    const req = { user: { id: '1' }, params: { id: '2' } };
    await controller.updateWallet(req, dto);
    expect(walletsServiceMock.updateWallet).toHaveBeenCalledWith(req.user.id, req.params.id, dto);
  });

  it('should call deleteWallet with id', async () => {
    const req = { user: { id: '1' }, params: { id: '2' } };
    await controller.deleteWallet(req);
    expect(walletsServiceMock.deleteWallet).toHaveBeenCalledWith(req.user.id, req.params.id);
  });
});
