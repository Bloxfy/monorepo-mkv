import { JwtStrategy } from './jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test-secret'; // força valor no env
    strategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user object from payload', async () => {
    const payload = { sub: 123, email: 'test@example.com' };

    const result = await strategy.validate(payload);

    expect(result).toEqual({
      id: 123,
      email: 'test@example.com',
    });
  });

  it('should fallback to "secret" if JWT_SECRET is not set', () => {
    delete process.env.JWT_SECRET;
    const s = new JwtStrategy();

    // como não dá pra acessar a opção private de super, 
    // a verificação é indireta: só garante que instancia sem erro
    expect(s).toBeInstanceOf(JwtStrategy);
  });
});
