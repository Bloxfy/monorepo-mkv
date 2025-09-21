import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({
        example: 't@t.com',
        description: 'The email of the User',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'myPassw0rd!',
        description: 'The password of the User',
    }) 
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: 'John',
        description: 'The first name of the User',
    }) 
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the User',
    }) 
    @IsString()
    @IsNotEmpty()
    lastName: string;
}
