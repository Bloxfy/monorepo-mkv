import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService,
        { provide: JwtService, useValue: mockJwtService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a JWT token if login is successful', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'testuser';
    loginDto.password = 'testpassword';
    const result = await controller.login(loginDto);
    expect(result).toHaveProperty('access_token');
  });
});
