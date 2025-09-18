import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appServiceMock: any;

  beforeEach(async () => {
    appServiceMock = { getHello: jest.fn() };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: appServiceMock }],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should call getHello', async () => {
      await appController.getHello();
      expect(appServiceMock.getHello).toHaveBeenCalledTimes(1);
    });
  });
});
