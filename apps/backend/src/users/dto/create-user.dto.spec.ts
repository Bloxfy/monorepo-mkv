import { validate } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

describe('CreateUserDto', () => {
  it('should be defined', () => {
    expect(new CreateUserDto()).toBeDefined();
  });

  it('should be invalid if email is not provided', async () => {
    const dto = new CreateUserDto();
    dto.email = 'testte';
    dto.password = 'password';
    dto.name = 'John';
    dto.lastName = 'Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if fields are not provided', async () => {
    const dto = new CreateUserDto();
    dto.email = '';
    dto.password = '';
    dto.name = '';
    dto.lastName = '';
    const errors = await validate(dto);
    expect(errors.length).toBe(4);
  });

  it('should be invalid if name is not provided', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@test.com';
    dto.password = 'password';
    dto.name = '';
    dto.lastName = 'Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be invalid if email is not valid', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@test';
    dto.password = 'password';
    dto.name = 'John';
    dto.lastName = 'Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be valid if all fields are provided', async () => {
    const dto = new CreateUserDto();
    dto.email = 'test@test.com';
    dto.password = 'password';
    dto.name = 'John';
    dto.lastName = 'Doe';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

});
