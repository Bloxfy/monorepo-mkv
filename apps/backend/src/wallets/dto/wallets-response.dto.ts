import { Expose } from "class-transformer";

export class WalletResponseDto {
    @Expose()
    id: string;

    @Expose()
    name: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}