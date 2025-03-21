// users.service.ts
import { Injectable, ConflictException, Inject } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { PasswordHasherService } from 'src/modules/auth/services/password-hasher.service';
import { CreateUserDto } from '../interfaces/create-user-dto.interface';
import { User } from '../interfaces/users.interface';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordHasherService: PasswordHasherService,
    @Inject('UserRepository')  private readonly userRepository: UserRepository,
  ) {}

  /* FIND USER BY EMAIL */
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }

  /* CREATE USER */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Verifica se o usuário já existe
    const existUser = await this.findByEmail(createUserDto.email);

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    // Faz hash da senha
    const hashedPassword = await this.passwordHasherService.hashPassword(createUserDto.passwordHash);

    const userData = {
      ...createUserDto,
      passwordHash: hashedPassword,
    };

    // Cria o usuário no DB
    return this.userRepository.create(userData);
  }

  /* FIND USER BY ID */
  async findByID(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }
}
