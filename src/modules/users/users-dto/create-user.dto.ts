// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsDate, IsOptional, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    readonly id: string;

    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    readonly username: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @IsOptional()
    readonly phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    readonly passwordHash: string;

    @IsString()
    @IsOptional()
    readonly bio: string;

    @IsString()
    @IsOptional()
    readonly profilePicture: string;

    @IsString()
    @IsOptional()
    readonly coverPicture: string;

    @IsDate()
    readonly dateOfBirth: Date;

    @IsBoolean()
    readonly isVerified: boolean;

    @IsString()
    @IsNotEmpty()
    readonly status: string;

    @IsDate()
    readonly lastLogin: Date;

    @IsDate()
    readonly createdAt: Date;

    @IsDate()
    readonly updatedAt: Date;
}
