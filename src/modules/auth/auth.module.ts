// src/modules/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { PasswordHasherService } from './services/password-hasher.service'; // Serviço de hash de senha
import { PasswordComparerService } from './services/password-comparer.service'; // Serviço de comparação de senha
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({ secret: 'secretKey', signOptions: { expiresIn: '1h' } }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'PASSWORD_HASHER',
      useClass: PasswordHasherService,
    },
    {
      provide: 'PASSWORD_COMPARER',
      useClass: PasswordComparerService,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}