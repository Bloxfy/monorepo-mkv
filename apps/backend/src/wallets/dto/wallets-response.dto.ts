import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

export class WalletResponseDto {
    @ApiProperty({
        example: '1a2b3c4d5e6f7g8h9i0j',
        description: 'The id of the Wallet',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'My Wallet',
        description: 'The name of the Wallet',
    })
    @Expose()
    name: string;

    @ApiProperty({
        example: '2025-09-20T20:49:42.663Z',
        description: 'The date of the Wallet was created',
    })
    @Expose()
    createdAt: Date;
    @ApiProperty({
        example: '2025-09-20T20:49:42.663Z',
        description: 'The date of the Wallet was updated',
    })
    @Expose()
    updatedAt: Date;
}

export class WalletsListResponseDto {
    @ApiProperty({
        type: [WalletResponseDto],
        description: "List of wallets",
    })
    @Expose()
    @Type(() => WalletResponseDto)
    items: WalletResponseDto[];

    @ApiProperty({
        description: "Pagination metadata",
        example: {
        totalItems: 100,
        itemCount: 10,
        itemsPerPage: 10,
        totalPages: 10,
        },
    })
    metadata?: {
        totalItems?: number;
        itemCount?: number;
        itemsPerPage?: number;
        totalPages?: number;
    }
}