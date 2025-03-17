import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { PrismaService } from '../database/prisma.service';
import { PasswordHasherService } from '../auth/services/password-hasher.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, PasswordHasherService],
  exports: [UsersService],
})
export class UsersModule {}
