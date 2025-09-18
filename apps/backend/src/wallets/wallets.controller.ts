import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Req } from '@nestjs/common';
import { Public } from '../auth/public.decorator';
import { plainToInstance } from 'class-transformer';
import { CreateWalletDto } from './dto/create-wallets.dto';
import { WalletsService } from './wallets.service';
import { WalletResponseDto } from './dto/wallets-response.dto';
import { UpdateWalletDto } from './dto/update-wallets.dto';

@Controller('wallets')
export class WalletsController {
    constructor(private readonly walletsService: WalletsService) { }

    @Public()
    @Post()
    @HttpCode(201)
    async createWallet(@Req() req: any, @Body() createWalletDto: CreateWalletDto) {
        return plainToInstance(
            WalletResponseDto,
            await this.walletsService.createWallet(req.user.id, createWalletDto),
            { excludeExtraneousValues: true }
        );
    }

    @Get(':id')
    async getWallet(@Req() req: any) {
        return plainToInstance(
            WalletResponseDto, 
            await this.walletsService.getWallet(req.user.id),
            { excludeExtraneousValues: true }
        );
    }

    @Put(':id')
    async updateWallet(@Req() req: any, @Body() updateWalletDto: UpdateWalletDto) {
        return plainToInstance(
            WalletResponseDto,
            await this.walletsService.updateWallet(req.user.id, req.params.id, updateWalletDto),
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
