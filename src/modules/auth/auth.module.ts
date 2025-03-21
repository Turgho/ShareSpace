import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../middleware/jwt/jwt.strategy';
import { AuthService } from './services/auth.service';
import { UsersModule } from '../users/users.module'; // Importe o módulo de usuários se necessário
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY || 'sua_senha_secreta', // Defina a chave secreta de forma segura
      signOptions: { expiresIn: '1h' }, // Expiração do token
    }),
    UsersModule, // Para acessar o serviço de usuários, se necessário
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Registra o JwtStrategy
  exports: [AuthService], // Exporta para ser usado em outros módulos
})
export class AuthModule {}
