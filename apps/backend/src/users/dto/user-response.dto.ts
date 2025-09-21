import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class UserResponseDto {
    @ApiProperty({
        example: 'iudjashd-12312-12312-12312',
        description: 'The id of the User',
    })
    @Expose()
    id: string;

    @ApiProperty({
        example: 'John',
        description: 'The first name of the User',
    }) 
    @Expose()
    name: string;

    @ApiProperty({
        example: 't@t.com',
        description: 'The email of the User',
    })
    @Expose()
    email: string;

    @ApiProperty({
        example: 'Doe',
        description: 'The last name of the User',
    }) 
    @Expose()
    lastName: string;

    @ApiProperty({
        example: 'Doe',
        description: 'When user was created',
    }) 
    @Expose()
    createdAt: Date;

    @ApiProperty({
        example: '',
        description: 'The last update of the User',
    })
    @Expose()
    updatedAt: Date;

    @ApiProperty({
        example: 'some-jwt-token',
        description: 'The token of the User',
    })
    @Expose()
    accessToken?: string;
}