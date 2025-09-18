import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class AccessTokenDto {
    @IsString()
    @IsNotEmpty()
    id: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
