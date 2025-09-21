import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from '../auth/public.decorator';
import { UserResponseDto } from './dto/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { LoginUserDto } from './dto/login-user.dto copy';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get token information' })
  @ApiOkResponse({ type: UserResponseDto })
  async getMe(@Req() req: any): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.usersService.getMe(req.user as any),
    );
  }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The user created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.usersService.createUser(createUserDto),
      { excludeExtraneousValues: true },
    );
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'Get auth token' })
  @ApiOkResponse({ type: UserResponseDto })
  async login(@Body() loginDto: LoginUserDto): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.usersService.login(loginDto),
      { excludeExtraneousValues: true },
    );
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Information about user' })
  @ApiOkResponse({ type: UserResponseDto })
  async getUser(@Req() req: any): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.usersService.getUser(req.user.id),
      { excludeExtraneousValues: true },
    );
  }

  @Patch()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserResponseDto })
  async updateUser(
    @Req() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return plainToInstance(
      UserResponseDto,
      await this.usersService.updateUser(req.user.id, updateUserDto),
      { excludeExtraneousValues: true },
    );
  }

  @Delete()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleted a new user' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The user created',
    type: UserResponseDto,
  })
  async deleteUser(@Req() req: any): Promise<void> {
    await this.usersService.deleteUser(req.user.id);
    return;
  }
}
