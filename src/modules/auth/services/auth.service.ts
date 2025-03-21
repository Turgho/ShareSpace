import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  /**
   * Gera um token JWT.
   * @param payload - Dados do usuário ou informações a serem codificadas no JWT.
   * @returns O JWT gerado.
   */
  async generateToken(payload: LoginDto): Promise<string> {
    return this.jwtService.sign(payload); // Assinando o payload com a chave secreta
  }

  /**
   * Valida um token JWT.
   * @param token - O JWT a ser validado.
   * @returns O payload do token se válido.
   */
  async validateToken(token: string): Promise<any> {
    return this.jwtService.verify(token); // Verifica o token
  }
}
