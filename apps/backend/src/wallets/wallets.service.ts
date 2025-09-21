import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWalletDto } from './dto/create-wallets.dto';
import { Wallet } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { UpdateWalletDto } from './dto/update-wallets.dto';
import { WalletsListResponseDto } from './dto/wallets-response.dto';

@Injectable()
export class WalletsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService
    ) { }

    async createWallet(ownerId: string, wallet: CreateWalletDto) {
        await this.usersService.getUser(ownerId);
        const newWallet = await this.prisma.wallet.create({
            data: {
                ...wallet,
                ownerId,
                deletedAt: null,
            }
        });
        return newWallet;
    }

    async getWallets(ownerId: string): Promise<WalletsListResponseDto> {
        const wallets = this.prisma.wallet.findMany({
            where: { ownerId, deletedAt: null }
        });

        return {
            items: await wallets,
        }
    }

    async getWallet(ownerId: string, walletId: string) {
        const wallet = await this.prisma.wallet.findUnique({
            where: { id: walletId, ownerId, deletedAt: null }
        });
        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        return wallet;
    }

    async updateWallet(ownerId: string, walletId: string, wallet: UpdateWalletDto) {
        await this.isOwner(walletId, ownerId);

        if (Object.keys(wallet).length === 0) {
            throw new BadRequestException('No fields to update');
        }


        return this.prisma.wallet.update({
            where: { id: walletId, deletedAt: null },
            data: wallet
        });
    }

    async deleteWallet(ownerId: string, walletId: string) {
        await this.isOwner(walletId, ownerId);

        return this.prisma.wallet.update({
            where: { id: walletId },
            data: {
                deletedAt: new Date()
            }
        });
    }

    private async isOwner(walletId: string, ownerId: string): Promise<Wallet> {
        const wallet = await this.getWallet(walletId, ownerId);

        if (!wallet) {
            throw new ForbiddenException('You are not the owner of this wallet');
        }

        return wallet;
    }
}
