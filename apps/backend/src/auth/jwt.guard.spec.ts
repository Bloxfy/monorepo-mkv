import { JwtGuard } from './jwt.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

describe('JwtGuard', () => {
  let guard: JwtGuard;
  let reflectorMock: Reflector;

  beforeEach(() => {
    reflectorMock = {
      getAllAndOverride: jest.fn(),
    } as any;
    guard = new JwtGuard(reflectorMock);
  });

  it('should return true if route is public', () => {
    (reflectorMock.getAllAndOverride as jest.Mock).mockReturnValue(true);

    const context = {
      getHandler: () => jest.fn(),
      getClass: () => jest.fn(),
    } as unknown as ExecutionContext;
    const result = guard.canActivate(context);

    expect(result).toBe(true);
  });

  it('should call super.canActivate if route is not public', () => {
    (reflectorMock.getAllAndOverride as jest.Mock).mockReturnValue(false);

    // mockar o comportamento do super.canActivate
    const canActivateSpy = jest.spyOn(
      Object.getPrototypeOf(guard),
      'canActivate',
    ).mockReturnValue(true);

    const context = {
      getHandler: () => jest.fn(),
      getClass: () => jest.fn(),
    } as unknown as ExecutionContext;
    const result = guard.canActivate(context);

    expect(canActivateSpy).toHaveBeenCalledWith(context);
    expect(result).toBe(true);

    canActivateSpy.mockRestore();
  });
});
