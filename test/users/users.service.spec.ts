import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../src/modules/users/services/users.service';
import { PrismaService } from '../../src/modules/database/prisma.service';
import * as bcrypt from 'bcrypt';
import { ConflictException } from '@nestjs/common';

describe('UsersService', () => {
    let usersService: UsersService;  // Instância do serviço que será testado
    let prismaService: PrismaService;  // Instância do PrismaService para mockar interações com o banco de dados
  
    // Mock do PrismaService para evitar interações reais com o banco de dados
    const mockPrismaService = {
      user: {
        findFirst: jest.fn(),  // Mock da função findFirst para simular a busca de um usuário
        create: jest.fn(),     // Mock da função create para simular a criação de um novo usuário
      },
    };
  
    beforeEach(async () => {
      // Configura o módulo de testes, injetando as dependências no serviço
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          UsersService,  // Serviço que será testado
          { provide: PrismaService, useValue: mockPrismaService },  // Injeta o mock do PrismaService no serviço
        ],
      }).compile();
  
      // Obtém as instâncias do serviço e do PrismaService mockado
      usersService = module.get<UsersService>(UsersService);
      prismaService = module.get<PrismaService>(PrismaService);
    });
  
    // Teste básico para verificar se o serviço foi definido corretamente
    it('deve estar definido', () => {
      expect(usersService).toBeDefined();  // Verifica se o serviço foi corretamente instanciado
    });
  
    describe('createUser', () => {
      // Dados simulados para um novo usuário
      const mockUserDto = {
        id: '123',
        name: 'John Doe',
        username: 'john_doe',
        email: 'john@example.com',
        bio: 'Testing bio.',
        profilePicture: 'https://exemple.com/johndoe.jpg',
        coverPicture: 'https://exemple.com/johndoe_cover.jpg',
        phoneNumber: '+5511987654321',
        passwordHash: 'PlainPassword123!',
        dateOfBirth: new Date(),
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isVerified: false,
        status: 'active',
      };

      // Teste para verificar se a função lança um erro se o usuário já existir
      it('deve lançar erro se o usuário já existir', async () => {
        // Simula a existência do usuário no banco de dados, retornando um usuário já existente
        mockPrismaService.user.findFirst.mockResolvedValue(mockUserDto);
  
        // Espera que a criação do usuário lance um erro de conflito (ConflictException)
        await expect(usersService.createUser(mockUserDto)).rejects.toThrow(
          ConflictException,
        );
      });
  
      // Teste para verificar se a criação de um novo usuário funciona corretamente
      it('deve criar um usuário novo se não existir', async () => {
        // Simula que o usuário ainda não existe no banco de dados
        mockPrismaService.user.findFirst.mockResolvedValue(null);
        // Simula a criação do novo usuário no banco de dados
        mockPrismaService.user.create.mockResolvedValue(mockUserDto);
  
        // Simula a função de hash da senha do bcrypt para evitar processamento real
        jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashed_password');
  
        // Executa a função createUser e armazena o resultado
        const result = await usersService.createUser(mockUserDto);
  
        // Verifica se o resultado retornado é o esperado
        expect(result).toEqual(mockUserDto);
        // Verifica se a função de criação do Prisma foi chamada corretamente
        expect(prismaService.user.create).toHaveBeenCalledWith({
          data: expect.objectContaining({
            passwordHash: 'hashed_password', // Confirma que a senha foi criptografada corretamente
          }),
        });
      });
  
      // Teste para verificar se a função lança um erro se a data de nascimento for inválida
      it('deve lançar erro se a data de nascimento for inválida', async () => {
        // Cria um usuário com uma data de nascimento inválida (uma string inválida)
        const invalidUserDto = { ...mockUserDto, dateOfBirth: new Date('Invalid-Date') };
  
        // Espera que a função lance um erro ao tentar criar um usuário com uma data inválida
        await expect(usersService.createUser(invalidUserDto)).rejects.toThrow(
          Error,  // Espera um erro genérico aqui
        );
      });
    });
});

