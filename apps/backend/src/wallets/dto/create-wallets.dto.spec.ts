import { validate } from 'class-validator';
import { CreateWalletDto } from './create-wallets.dto';

describe('CreateWalletDto', () => {
  it('should be defined', () => {
    expect(new CreateWalletDto()).toBeDefined();
  });

  it('should be invalid if name is not provided', async () => {
    const dto = new CreateWalletDto();
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

  it('should be valid if all fields are provided', async () => {
    const dto = new CreateWalletDto();
    dto.name = 'wallet test';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

});
