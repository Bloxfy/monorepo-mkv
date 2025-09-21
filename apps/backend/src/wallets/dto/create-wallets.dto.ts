import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateWalletDto {
    @ApiProperty({
        example: 'My Wallet',
        description: 'The name of the Wallet',
    })
    @IsString()
    @Length(1, 50)
    name: string;
}
