import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;
  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mocked-jwt-token'),
    verify: jest.fn().mockReturnValue(
      { 
        sub: 'mocked-user-id', 
        username: 'mocked-username'
      }
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [AuthService,
        { provide: JwtService, useValue: mockJwtService }],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a JWT token if login is successful', async () => {
    const result = await service.login({ id: 'mocked-user-id', username: 'mocked-username' });
    expect(result).toHaveProperty('access_token');
  });

  it('should verify a JWT token', async () => {
    const result = await service.verify('mocked-jwt-token');
    expect(result).toEqual({ sub: 'mocked-user-id', username: 'mocked-username' });
  });
});
