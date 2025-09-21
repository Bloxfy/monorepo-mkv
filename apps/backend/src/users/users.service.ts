import { AuthService } from '../auth/auth.service';
import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly authService: AuthService
    ) { }
    async getMe(user: any) {
        return user;
    }

    async createUser(user: CreateUserDto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: user.email }
        });

        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await this.prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });
        const accessToken = await this.authService.getAccessToken({id: newUser.id, email: newUser.email});
        return { ...newUser, ...accessToken };
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginUserDto.username }
        });

        if (!user) {
            throw new UnauthorizedException('Invalid password or username');
        }

        const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password or username');
        }

        const accessToken = await this.authService.getAccessToken({id: user.id, email: user.email});
        return { ...user, ...accessToken };
    }

    async getUser(userId: string) {
        return await this.privateGetUser(userId);
    }

    async updateUser(userId: string, user: UpdateUserDto) {
        await this.privateGetUser(userId);

        if (Object.keys(user).length === 0) {
            throw new BadRequestException('No fields to update');
        }

        return this.prisma.user.update({
            where: { id: userId },
            data: user
        });
    }

    async deleteUser(userId: string) {
        await this.privateGetUser(userId);

        return this.prisma.user.update({
            where: { id: userId },
            data: {
                deletedAt: new Date()
            }
        });
    }

    private async privateGetUser(userId: string): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
