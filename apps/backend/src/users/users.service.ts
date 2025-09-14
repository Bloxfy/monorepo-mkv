import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService) { }
    async getMe(user: any) {
        return user;
    }

    async createUser(user: CreateUserDto) {
        const existing = await this.prismaService.prisma.user.findUnique({
            where: { email: user.email }
        });

        if (existing) {
            throw new ConflictException('Email already registered');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const newUser = await this.prismaService.prisma.user.create({
            data: {
                ...user,
                password: hashedPassword
            }
        });
        return newUser;
    }

    async getUser(userId: string) {
        const user = await this.privateGetUser(userId);

        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    async updateUser(userId: string, user: UpdateUserDto) {
        await this.privateGetUser(userId);

        if (Object.keys(user).length === 0) {
            throw new BadRequestException('No fields to update');
        }

        return this.prismaService.prisma.user.update({
            where: { id: userId },
            data: user
        });
    }

    async deleteUser(userId: string) {
        await this.privateGetUser(userId);

        return this.prismaService.prisma.user.update({
            where: { id: userId },
            data: {
                deletedAt: new Date()
            }
        });
    }

    private async privateGetUser(userId: string): Promise<User> {
        const user = await this.prismaService.prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        return user;
    }
}
