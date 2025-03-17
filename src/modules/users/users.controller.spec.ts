// src/users/users.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './users-dto/create-user.dto';
import { PrismaService } from '../database/prisma.service';
import { randomUUID } from 'crypto';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService, // Mocking Prisma Service or you can use a mock for database interaction
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  // Descrição da Criação do User
  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        id: '',
        name: 'John Doe',
        email: 'john.doe@example.com',
        passwordHash: 'hashedpassword',
        username: 'johndoe',
        dateOfBirth: new Date('1990-01-01T00:00:00Z'),
        phoneNumber: '+5511987654321',
        bio: 'Developer',
        profilePicture: 'http://example.com/johndoe.jpg',
        coverPicture: 'http://example.com/johndoe_cover.jpg',
        isVerified: true,
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Add novo id de teste
      const userResult = {
        ...createUserDto,
        id: randomUUID(),
      };

      jest.spyOn(usersService, 'createUser').mockResolvedValue(userResult);

      // Executa o createUser
      const result = await usersController.create(createUserDto);

      // Resultado esperado
      expect(result).toEqual(userResult);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(usersService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });
});
