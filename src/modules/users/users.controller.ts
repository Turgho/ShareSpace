import { Controller, Body, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';
import { User } from './users.interface';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user.' })
  @ApiResponse({ status: 201, description: 'New user created.' })
  @ApiResponse({ status: 400, description: 'Error creating a new user.' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }
}
