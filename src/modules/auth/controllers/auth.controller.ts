import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedException } from '@nestjs/common';

@ApiTags('Users')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  // Rota para login de usuário
  @Post('login')
  @ApiOperation({ summary: 'User login.' })
  @ApiResponse({ 
    status: 200, 
    description: 'User has been successfully logged in.',
    schema: { 
      example: { access_token: 'your_jwt_token_here' } 
    }
  })
  @ApiResponse({ 
    status: 401, 
    description: 'Unauthorized user login.',
    schema: { 
      example: { message: 'Invalid credentials' } 
    }
  })
  @ApiResponse({ 
    status: 404, 
    description: 'User not found.',
    schema: { 
      example: { message: 'User not found' } 
    }
  })
  async login(@Body() loginDto: LoginDto) {
    try {
      // Retorna token do usuário
      return await this.authService.generateToken(loginDto);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid credentials');
      }
      throw error;
    }
  }
}
