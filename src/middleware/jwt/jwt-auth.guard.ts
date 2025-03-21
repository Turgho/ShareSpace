import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      // Extraímos o token Bearer
      const bearerToken = token.split(' ')[1]; // 'Bearer <token>'
      
      // Verificamos e decodificamos o token
      const decoded = this.jwtService.verify(bearerToken);
      
      // Anexa os dados do usuário no objeto da requisição
      request.user = decoded;

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
