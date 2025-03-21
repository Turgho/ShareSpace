import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    // EMAIL
    @ApiProperty({
        description: 'The user email.',
        example: 'john.doe@example.com',
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    // PASSWORD
    @ApiProperty({
        description: 'The user password',
        example: 'PlainPassword123!',
    })
    @IsNotEmpty()
    @IsString()
    password: string;
}