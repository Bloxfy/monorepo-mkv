import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    async getMe(@Req() req: any) {
        return plainToInstance(UserResponseDto, await this.usersService.getMe(req.user as any));
    }

    @Public()
    @Post('signup')
    @HttpCode(201)
    async createUser(@Body() createUserDto: CreateUserDto) {
        return plainToInstance(UserResponseDto, await this.usersService.createUser(createUserDto), { excludeExtraneousValues: true });
    }

    @Get()
    async getUser(@Req() req: any) {
        return plainToInstance(UserResponseDto, await this.usersService.getUser(req.user.id), { excludeExtraneousValues: true });
    }

    @Put()
    async updateUser(@Req() req: any, @Body() updateUserDto: UpdateUserDto) {
        return plainToInstance(UserResponseDto, await this.usersService.updateUser(req.user.id, updateUserDto), { excludeExtraneousValues: true });
    }

    @Delete()
    @HttpCode(204)
    async deleteUser(@Req() req: any) {
        await this.usersService.deleteUser(req.user.id);
        return;
    }
}
