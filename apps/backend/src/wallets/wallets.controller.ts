import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateWalletDto } from './dto/create-wallets.dto';
import { WalletsService } from './wallets.service';
import { WalletResponseDto, WalletsListResponseDto } from './dto/wallets-response.dto';
import { UpdateWalletDto } from './dto/update-wallets.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('wallets')
@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create a new wallet' })
    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The wallet has been successfully created',
        type: WalletResponseDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        description: 'Invalid data',
    })
    async createWallet(@Req() req: any, @Body() createWalletDto: CreateWalletDto): Promise<WalletResponseDto> {
        return plainToInstance(
            WalletResponseDto,
            await this.walletsService.createWallet(req.user.id, createWalletDto),
            { excludeExtraneousValues: true }
        );
    }

    @Get()
    @ApiOperation({ summary: 'List wallets' })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Wallet not found' })
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'The found record',
        type: WalletsListResponseDto,
    })
    async getWallets(@Req() req: any): Promise<WalletsListResponseDto> {
        return plainToInstance(
            WalletsListResponseDto,
            await this.walletsService.getWallets(req.user.id),
            { excludeExtraneousValues: true }
        );
    }

    @Get(':walletId')
    async getWallet(@Req() req: any, @Param('walletId') walletId: string) {
        return plainToInstance(
            WalletResponseDto,
            await this.walletsService.getWallet(req.user.id, walletId),
            { excludeExtraneousValues: true }
        );
    }

    @Put(':walletId')
    async updateWallet(@Req() req: any, @Param('walletId') walletId: string, @Body() updateWalletDto: UpdateWalletDto) {
        return plainToInstance(
            WalletResponseDto,
            await this.walletsService.updateWallet(req.user.id, walletId, updateWalletDto),
            { excludeExtraneousValues: true }
        );
    }

    @Delete()
    @HttpCode(204)
    async deleteWallet(@Req() req: any) {
        await this.walletsService.deleteWallet(req.user.id, req.params.id);
        return;
    }
}
