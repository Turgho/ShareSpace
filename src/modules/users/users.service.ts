import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './users-dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { User } from './users.interface';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async createUser(createUserDto: CreateUserDto): Promise<User> {
        
        // Verifique se a data está correta antes de enviar
        const validDateOfBirth = new Date(createUserDto.dateOfBirth);
        if (isNaN(validDateOfBirth.getTime())) {
            throw new Error('Invalid date of birth');
        }

        // Cria novo usuário no DB
        const user = await this.prisma.user.create({
            data: {
                ...createUserDto,
                dateOfBirth: validDateOfBirth,
                lastLogin: new Date(createUserDto.lastLogin),
                createdAt: new Date(createUserDto.createdAt),
                updatedAt: new Date(createUserDto.updatedAt),
            }
        });
        return user;
    }
}
