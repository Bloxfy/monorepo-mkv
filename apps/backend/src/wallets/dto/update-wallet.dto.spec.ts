import { validate } from 'class-validator';
import { UpdateWalletDto } from './update-wallets.dto';

describe('UpdateWalletDto', () => {
  it('should be defined', () => {
    expect(new UpdateWalletDto()).toBeDefined();
  });

  it('should be valid if name is provided', async () => {
    const dto = new UpdateWalletDto();
    dto.name = 'wallet test';
    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should be invalid if name is not provided', async () => {
    const dto = new UpdateWalletDto();
    dto.name = '';
    const errors = await validate(dto);
    expect(errors.length).toBe(1);
  });

});
