import { Module } from '@nestjs/common';
import { JwtStrategy } from 'src/middleware/jwt/jwt.strategy';
import { JwtAuthGuard } from 'src/middleware/jwt/jwt-auth.guard';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { PrismaService } from '../database/prisma.service';
import { PasswordHasherService } from '../auth/services/password-hasher.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaUserRepository } from './repositories/user.repository';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,  // Defina a chave secreta
      signOptions: { expiresIn: '1h' },  // Defina o tempo de expiração do token
    }),
  ],
  providers: [
    UsersService, 
    JwtStrategy, 
    JwtAuthGuard, 
    PrismaService, 
    PasswordHasherService,
    {
      provide: 'UserRepository',
      useClass: PrismaUserRepository,
    }
  ],
  controllers: [UsersController],
})
export class UsersModule {}
