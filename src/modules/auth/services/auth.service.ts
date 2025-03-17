import { Injectable, BadGatewayException, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { IPasswordComparer } from '../interfaces/password-comparer.interface';
import { UsersService } from '../../users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';
import { IPasswordHasher } from '../interfaces/password-hasher.interface';
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Serviço de usuários
    @Inject('PASSWORD_HASHER') private passwordHasher: IPasswordHasher,
    @Inject('PASSWORD_COMPARER') private passwordComparer: IPasswordComparer, // Injeção da interface de comparação de senha
    private readonly jwtService: JwtService, // Serviço JWT para geração de tokens
  ) {}

  // Função de login - Verifica a senha do usuário
  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Valida a senha do usuário
    const isPasswordValid = await this.passwordComparer.comparePasswords(loginDto.password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    // Retorna payload para o frontend
    const payload = { email: user.email, sub: user.id }; // Payload para o token JWT
    const access_token = this.jwtService.sign(payload); // Geração do token

    return { access_token, username: user.username };
  }
}
