import { validate } from 'class-validator';
import { LoginDto } from './login.dto';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new LoginDto()).toBeDefined();
  });

  it('should be invalid if username is empty', async () => {
    const loginDto = new LoginDto();
    loginDto.username = '';
    loginDto.password = 'testpassword';
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('username');
    expect(errors[0].constraints?.isNotEmpty).toBe('username should not be empty');
  });

  it('should be invalid if username is not a string', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 123 as any;
    loginDto.password = 'testpassword';
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('username');
    expect(errors[0].constraints?.isString).toBe('username must be a string');
  });

  it('should be invalid if password is not a string', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'testuser';
    loginDto.password = 123 as any;
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.isString).toBe('password must be a string');
  });

  it('should be invalid if password is empty', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'testuser';
    loginDto.password = '';
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('password');
    expect(errors[0].constraints?.isNotEmpty).toBe('password should not be empty');
  });

  it('should be valid if username and password are strings', async () => {
    const loginDto = new LoginDto();
    loginDto.username = 'testuser';
    loginDto.password = 'testpassword';
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(0);
  });
});
