import { validate } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { plainToInstance } from 'class-transformer';

describe('UpdateUserDto', () => {
  it('should be defined', () => {
    expect(new UpdateUserDto()).toBeDefined();
  });

  it('should be invalid if name is not provided', async () => {
    const dto = new UpdateUserDto();
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if email is provided', async () => {
    const dto = { email: 'test@test.com' };
    const instance = plainToInstance(UpdateUserDto, dto);
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    expect(errors.length).toBe(1);
  });

  it('should be invalid if password is provided', async () => {
    const dto = { password: 'password' };
    const instance = plainToInstance(UpdateUserDto, dto);
    const errors = await validate(instance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });
    expect(errors.length).toBe(1);
  });

  it('should be valid if all fields are provided', async () => {
    const dto = new UpdateUserDto();
    dto.name = 'John Doe';
    dto.lastName = 'Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
