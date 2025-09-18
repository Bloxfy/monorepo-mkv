import { validate } from 'class-validator';
import { AccessTokenDto } from './login.dto';

describe('LoginDto', () => {
  it('should be defined', () => {
    expect(new AccessTokenDto()).toBeDefined();
  });

  it('should be invalid if id is empty', async () => {
    const loginDto = new AccessTokenDto();
    loginDto.id = '';
    loginDto.email = 'testemail@test.com';
    const errors = await validate(loginDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints?.isNotEmpty).toBe('id should not be empty');
  });

  it('should be invalid if id is not a string', async () => {
    const accessTokenDto = new AccessTokenDto();
    accessTokenDto.id = 123 as any;
    accessTokenDto.email = 'testemail@test.com';
    const errors = await validate(accessTokenDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('id');
    expect(errors[0].constraints?.isString).toBe('id must be a string');
  });

  it('should be invalid if email is not a string', async () => {
    const accessTokenDto = new AccessTokenDto();
    accessTokenDto.id = 'testid';
    accessTokenDto.email = 123 as any;
    const errors = await validate(accessTokenDto);
    expect(errors).toHaveLength(1);
  });

  it('should be invalid if id is empty', async () => {
    const accessTokenDto = new AccessTokenDto();
    accessTokenDto.id = '';
    accessTokenDto.email = 'testemail@test.com';
    const errors = await validate(accessTokenDto);
    expect(errors).toHaveLength(1);
    expect(errors[0].property).toBe('id');
  });

  it('should be valid if id and email are strings', async () => {
    const accessTokenDto = new AccessTokenDto();
    accessTokenDto.id = 'testid';
    accessTokenDto.email = 'testemail@test.com';
    const errors = await validate(accessTokenDto);
    expect(errors).toHaveLength(0);
  });
});
