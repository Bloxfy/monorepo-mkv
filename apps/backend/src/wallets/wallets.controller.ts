import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateWalletDto } from './dto/create-wallets.dto';
import { WalletsService } from './wallets.service';
import {
  WalletResponseDto,
  WalletsListResponseDto,
} from './dto/wallets-response.dto';
import { UpdateWalletDto } from './dto/update-wallets.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new wallet' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The wallet created',
    type: WalletResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data',
  })
  async createWallet(
    @Req() req: any,
    @Body() createWalletDto: CreateWalletDto,
  ): Promise<WalletResponseDto> {
    return plainToInstance(
      WalletResponseDto,
      await this.walletsService.createWallet(req.user.id, createWalletDto),
      { excludeExtraneousValues: true },
    );
  }

  @Get()
  @ApiOperation({ summary: 'List wallets' })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found records',
    type: WalletsListResponseDto,
  })
  async getWallets(@Req() req: any): Promise<WalletsListResponseDto> {
    return plainToInstance(
      WalletsListResponseDto,
      await this.walletsService.getWallets(req.user.id),
      { excludeExtraneousValues: true },
    );
  }

  @Get(':walletId')
  @ApiOperation({ summary: 'List wallets' })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'The ID of the wallet',
    example: '21sad1d6-1f7a-4e2b-8f3d-9c8e7f6a5b4c',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The found record',
    type: WalletResponseDto,
  })
  async getWallet(
    @Req() req: any,
    @Param('walletId') walletId: string,
  ): Promise<WalletResponseDto> {
    return plainToInstance(
      WalletResponseDto,
      await this.walletsService.getWallet(req.user.id, walletId),
      { excludeExtraneousValues: true },
    );
  }

  @Put(':walletId')
  @ApiOperation({ summary: 'Update wallet' })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'The ID of the wallet',
    example: '21sad1d6-1f7a-4e2b-8f3d-9c8e7f6a5b4c',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The updated record',
    type: WalletsListResponseDto,
  })
  async updateWallet(
    @Req() req: any,
    @Param('walletId') walletId: string,
    @Body() updateWalletDto: UpdateWalletDto,
  ): Promise<WalletResponseDto> {
    return plainToInstance(
      WalletResponseDto,
      await this.walletsService.updateWallet(
        req.user.id,
        walletId,
        updateWalletDto,
      ),
      { excludeExtraneousValues: true },
    );
  }

  @Delete(':walletId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete wallet' })
  @ApiParam({
    name: 'walletId',
    type: String,
    description: 'The ID of the wallet',
    example: '21sad1d6-1f7a-4e2b-8f3d-9c8e7f6a5b4c',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Wallet not found',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Success deleted record',
  })
  async deleteWallet(
    @Req() req: any,
    @Param('walletId') walletId: string,
  ): Promise<void> {
    await this.walletsService.deleteWallet(req.user.id, walletId);
    return;
  }
}
