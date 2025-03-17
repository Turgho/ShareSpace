import { IsString, IsEmail, IsNotEmpty, IsOptional, IsDateString, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    // ID
    @ApiProperty({
        description: 'The unique ID of the user',
        example: '123e4567-e89b-12d3-a456-426614174000',
    })
    @IsNotEmpty()
    @IsString()
    id: string;

    // NAME
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    // USERNAME
    @ApiProperty({
        description: 'The username of the user',
        example: 'john_doe',
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    // EMAIL
    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    // PHONE NUMBER
    @ApiProperty({
        description: 'The phone number of the user',
        example: '+1234567890',
    })
    @IsPhoneNumber()
    phoneNumber: string;

    // PASSWORD HASH
    @ApiProperty({
        description: 'The hashed password of the user',
        example: '$2b$10$KIX9p7Y5Zs1g9EoFW0VpeKo2G8G0nLgKc1JivFk6O4gaHlkEYboR.',
    })
    @IsNotEmpty()
    @IsString()
    passwordHash: string;

    // BIO
    @ApiProperty({
        description: 'The bio of the user',
        example: 'Developer and tech enthusiast',
    })
    @IsOptional()
    @IsString()
    bio: string;

    // PROFILE PICTURE
    @ApiProperty({
        description: 'Profile picture URL',
        example: 'https://example.com/images/john-doe.jpg',
    })
    @IsOptional()
    @IsString()
    profilePicture: string;

    // COVER PICTURE
    @ApiProperty({
        description: 'Cover picture URL',
        example: 'https://example.com/images/cover.jpg',
    })
    @IsOptional()
    @IsString()
    coverPicture: string;

    // IS VERIFIED
    @ApiProperty({
        description: 'Whether the user is verified',
        example: true,
    })
    @IsNotEmpty()
    isVerified: boolean;

    // STATUS
    @ApiProperty({
        description: 'The status of the user',
        example: 'active',
    })
    @IsNotEmpty()
    @IsString()
    status: string;

    // BIRTH DATE
    @ApiProperty({
        description: 'The date of birth of the user',
        example: '1990-05-15T00:00:00Z',
    })
    @IsDateString()
    dateOfBirth: Date;

    // LAST LOGIN
    @ApiProperty({
        description: 'Last login date of the user',
        example: '2025-03-01T10:30:00Z',
    })
    @IsDateString()
    lastLogin: Date;

    // CREATED USER AT
    @ApiProperty({
        description: 'The date the user was created',
        example: '2025-01-01T00:00:00Z',
    })
    @IsDateString()
    createdAt: Date

    // UPDATED USER AT
    @ApiProperty({
        description: 'The date the user was last updated',
        example: '2025-01-01T00:00:00Z',
    })
    @IsDateString()
    updatedAt: Date
}
