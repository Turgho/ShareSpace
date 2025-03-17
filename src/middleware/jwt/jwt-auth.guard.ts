import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization'];

    if (!token) {
      throw new Error('No token provided');
    }

    try {
      // Remover "Bearer" do token
      const bearerToken = token.split(' ')[1];
      const decoded = this.jwtService.verify(bearerToken);

      // Adiciona os dados do usuário ao request
      request.user = decoded;
      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}