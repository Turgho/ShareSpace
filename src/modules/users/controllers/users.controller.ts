import { Controller, Get, Body, Post, Param, UseGuards, NotFoundException } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../interfaces/create-user-dto.interface';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResponseMessageDto } from 'src/common/dto/response-message-dto';
import { JwtAuthGuard } from 'src/middleware/jwt/jwt-auth.guard';
import { User } from '../interfaces/users.interface';
import { plainToClass } from 'class-transformer';
import { UserProfileDto } from '../interfaces/user-profile-dto.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /*
    CREATE NEW USER
  */
  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiResponse({ 
    status: 201, 
    description: 'New user created.', 
    schema: { example: { message: ['User created successfully.'] } } 
  })
  @ApiResponse({ 
    status: 409, 
    description: 'User already exists.', 
    schema: { example: { message: ['User already exists.'] } } 
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseMessageDto> {
    await this.usersService.createUser(createUserDto);
    
    return { 
      message: ['User created successfully.'],
      statusCode: 201,
    };
  }

  /*
    GET USER PROFILE
  */
  @Get('profile/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile.' })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
    schema: { example: { message: ['User not found.'] } }
  })
  @ApiResponse({
    status: 401,
    description: 'No jwt token provided.',
    schema: { example: { message: ['No token provided'] } }
  })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: UserProfileDto
  })
  async getUserProfile(@Param('id') id: string): Promise<UserProfileDto> {
    const user = await this.usersService.findByID(id);

    if (!user){
      throw new NotFoundException('User not found.');
    }

    // Refatora o User para UserProfileDto
    return plainToClass(UserProfileDto, user);
  }
}
