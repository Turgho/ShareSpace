// user.repository.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from '../interfaces/create-user-dto.interface';
import { User } from '../interfaces/users.interface';

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  create(userData: CreateUserDto): Promise<User>;
}

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Buscar usuário por email
  async findByEmail(email: string): Promise<User | null> {
    if (!email) {
      throw new BadRequestException('Email is required');
    }
    return this.prisma.user.findUnique({ where: { email } });
  }

  // Buscar usuário por ID
  async findById(id: string): Promise<User | null> {
    if (!id) {
      throw new BadRequestException('ID is required');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Criar um novo usuário
  async create(userData: CreateUserDto): Promise<User> {
    if (!userData) {
      throw new BadRequestException('User data is required');
    }
    return this.prisma.user.create({ data: userData });
  }
}
