import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsersController', () => {
  let controller: UsersController;
  let userServiceMock: any;

  beforeEach(async () => {
    userServiceMock = {
      getMe: jest.fn(),
      createUser: jest.fn(),
      getUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, {
        provide: PrismaService,
        useValue: userServiceMock,
      }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should call getMe with correct user', async () => {
    const req = { user: { id: '1' } };
    await controller.getMe(req);
    expect(userServiceMock.getMe).toHaveBeenCalledWith(req.user);
  });

  it('should call createUser with DTO', async () => {
    const dto = { email: 'a@a.com', password: '123', name: 'Test' };
    await controller.createUser(dto);
    expect(userServiceMock.createUser).toHaveBeenCalledWith(dto);
  });

  it('should call getUser with id', async () => {
    await controller.getUser('1');
    expect(userServiceMock.getUser).toHaveBeenCalledWith('1');
  });

  it('should call updateUser with id and DTO', async () => {
    const dto = { name: 'Updated' };
    await controller.updateUser('1', dto);
    expect(userServiceMock.updateUser).toHaveBeenCalledWith('1', dto);
  });

  it('should call deleteUser with id', async () => {
    await controller.deleteUser('1');
    expect(userServiceMock.deleteUser).toHaveBeenCalledWith('1');
  });
});
