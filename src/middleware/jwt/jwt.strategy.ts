import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';  // Correção na importação
import { Strategy } from 'passport-jwt';  // Estratégia passport-jwt
import { ExtractJwt } from 'passport-jwt';  // Utiliza o ExtractJwt para pegar o token do header
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

/**
 * Estratégia de autenticação usando JWT.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Extrai o token JWT
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,  // A chave secreta para validar o JWT
    });
  }

  /**
   * Valida o payload do JWT
   * @param payload - O payload do token decodificado
   * @returns O payload ou lança erro se inválido
   */
  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return payload; // Normalmente, você retorna o usuário aqui
  }
}
