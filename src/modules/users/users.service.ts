import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './users-dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from './users.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  // Caracteres para o hash da senha
  private readonly saltRounds = 10;

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Verifique se o usuário já existe
    const existUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      // Lança um erro de conflito, pois o usuário já existe
      throw new ConflictException('User already exists');
    }

    // Verifique se a data de nascimento é válida
    const validDateOfBirth = new Date(createUserDto.dateOfBirth);
    if (isNaN(validDateOfBirth.getTime())) {
      // Lança um erro de requisição inválida para dados inválidos
      throw new BadRequestException('Invalid date of birth');
    }

    // Verifique se a senha foi fornecida
    if (!createUserDto.passwordHash) {
      throw new BadRequestException('Password is required');
    }

    // Hash da senha antes de armazenar
    const hashedPassword = await bcrypt.hash(createUserDto.passwordHash, this.saltRounds);

    // Cria novo usuário no DB
    const user = await this.prisma.user.create({
      data: {
        ...createUserDto,
        passwordHash: hashedPassword,
        dateOfBirth: validDateOfBirth,
        lastLogin: new Date(createUserDto.lastLogin),
        createdAt: new Date(createUserDto.createdAt),
        updatedAt: new Date(createUserDto.updatedAt),
      },
    });

    return user;
  }
}
