import { validate } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

describe('UpdateUserDto', () => {
  it('should be defined', () => {
    expect(new UpdateUserDto()).toBeDefined();
  });

  it('should be invalid if userId is not provided', async () => {
    const dto = new UpdateUserDto();
    dto.name = 'John Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if name is not provided', async () => {
    const dto = new UpdateUserDto();
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if email is provided', async () => {
    const dto = new UpdateUserDto() as any;
    dto.userId = '1';
    dto.email = 'test@test.com';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if password is provided', async () => {
    const dto = new UpdateUserDto() as any;
    dto.password = 'password';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be valid if all fields are provided', async () => {
    const dto = new UpdateUserDto();
    dto.name = 'John Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
