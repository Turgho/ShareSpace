import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsPhoneNumber,
  IsHash,
  Matches
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserProfileDto {
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
    example: '+5511987654321',
  })
  @IsPhoneNumber()
  phoneNumber: string;

  // PASSWORD
  @Exclude()
  passwordHash: string;

  // BIO
  @ApiProperty({
    description: 'The bio of the user',
    example: 'Developer and tech enthusiast',
  })
  @IsOptional()
  @IsString()
  bio?: string | null;

  // PROFILE PICTURE
  @ApiProperty({
    description: 'Profile picture URL',
    example: 'https://example.com/images/john-doe.jpg',
  })
  @IsOptional()
  @IsString()
  profilePicture?: string | null;

  // COVER PICTURE
  @ApiProperty({
    description: 'Cover picture URL',
    example: 'https://example.com/images/cover.jpg',
  })
  @IsOptional()
  @IsString()
  coverPicture?: string | null;

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
  @Exclude()
  lastLogin: Date;

  // CREATED USER AT
  @Exclude()
  createdAt: Date;

  // UPDATED USER AT
  @Exclude()
  updatedAt: Date;
}  