import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from '../../database/prisma.service';
import { User } from '../interfaces/users.interface';
import { PasswordHasherService } from 'src/modules/auth/services/password-hasher.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordHasherService: PasswordHasherService
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Verifique se o usuário já existe
    const existUser = await this.prisma.user.findFirst({
      where: { email: createUserDto.email },
    });

    if (existUser) {
      throw new ConflictException('User already exists');
    }

    // Validação de data de nascimento
    const validDateOfBirth = new Date(createUserDto.dateOfBirth);
    if (isNaN(validDateOfBirth.getTime())) {
      throw new BadRequestException('Invalid date of birth');
    }

    // Verifique se a senha foi fornecida
    if (!createUserDto.passwordHash) {
      throw new BadRequestException('Password is required');
    }

    // Hash da senha antes de armazenar
    const hashedPassword = await this.passwordHasherService.hashPassword(createUserDto.passwordHash);

    // Criação do objeto de dados de usuário, incluindo passwordHash
    const userData = {
      ...createUserDto,
      passwordHash: hashedPassword, // A senha deve ser armazenada como passwordHash
      dateOfBirth: validDateOfBirth,
      lastLogin: new Date(createUserDto.lastLogin),
      createdAt: new Date(createUserDto.createdAt),
      updatedAt: new Date(createUserDto.updatedAt),
    };

    // Remove campos opcionais não fornecidos
    if (!createUserDto.bio) {
      delete userData.bio;
    }
    if (!createUserDto.profilePicture) {
      delete userData.profilePicture;
    }

    // Criação do usuário
    const user = await this.prisma.user.create({
      data: userData,
    });

    return user;
  }

  async findByEmail(email: string): Promise<User|null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
