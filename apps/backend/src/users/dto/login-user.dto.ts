import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        example: 't@t.com',
        description: 'The username of the User',
    })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({
        example: 'myPassw0rd!',
        description: 'The password of the User',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

}