import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
    ) {}
    
    async getAccessToken({id, email}: {id: string, email: string}) {
        const payload = { sub: id, email: email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async verify(token: string): Promise<any> {
        await this.jwtService.verify(token);

        const decoded = await this.jwtService.decode(token);
        if (!decoded) {
            throw new UnauthorizedException('Invalid token');
        }
        return decoded;
    }
}
