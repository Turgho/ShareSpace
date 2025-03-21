import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../../src/modules/users/controllers/users.controller';
import { UsersService } from '../../src/modules/users/services/users.service';
import { PrismaService } from '../../src/modules/database/prisma.service';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from '../../src/modules/users/interfaces/create-user-dto.interface';

describe('UsersController', () => {
  let controller: UsersController;  // Instância do controller que será testada
  let service: UsersService;        // Instância do service que o controller irá chamar

  // Mock do PrismaService para evitar interações reais com o banco de dados
  beforeEach(async () => {
    // Configura um módulo de testes para injetar dependências no controller
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],   // Controller a ser testado
      providers: [
        UsersService,  // Serviço que o controller usa
        {
          provide: PrismaService,  // Mock do PrismaService para evitar chamadas reais ao banco de dados
          useValue: {
            user: {
              findFirst: jest.fn(),  // Mock da função findFirst do Prisma para evitar busca real
              create: jest.fn(),     // Mock da função create do Prisma para evitar inserção real
            },
          },
        },
      ],
    }).compile();  // Compila o módulo de testes

    // Obtém as instâncias do controller e do service mockado para realizar os testes
    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  // Teste básico para verificar se o controller foi definido corretamente
  it('deve ser definido', () => {
    expect(controller).toBeDefined();  // Verifica se o controller foi corretamente instanciado
  });

  // Grupo de testes relacionados à função createUser
  describe('createUser', () => {
    it('deve criar um usuário com sucesso', async () => {
      // Dados simulados para um novo usuário
      const createUserDto: CreateUserDto = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedPassword123',
        username: 'johndoe',
        dateOfBirth: new Date('1990-05-15'),
        phoneNumber: '+5511987654321',
        bio: 'Developer',
        profilePicture: 'https://example.com/profile.jpg',
        coverPicture: 'https://example.com/cover.jpg',
        isVerified: true,
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Dados esperados para o usuário que será retornado
      const user = { ...createUserDto, passwordHash: 'hashedPassword123' };

      // Simula a função do serviço createUser para retornar um usuário simulado sem acessar o banco
      jest.spyOn(service, 'createUser').mockResolvedValue(user);

      // Executa o método create do controller e armazena o resultado
      const result = await controller.create(createUserDto);

      // Verifica se o resultado retornado é o esperado
      expect(result).toEqual(user);

      // Verifica se a função createUser foi chamada corretamente com os dados fornecidos
      expect(service.createUser).toHaveBeenCalledWith(createUserDto);
    });

    it('deve lançar erro se o usuário já existir', async () => {
      // Dados simulados para o usuário a ser criado
      const createUserDto: CreateUserDto = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedPassword123',
        username: 'johndoe',
        dateOfBirth: new Date('1990-05-15'),
        phoneNumber: '+5511987654321',
        bio: 'Developer',
        profilePicture: 'https://example.com/profile.jpg',
        coverPicture: 'https://example.com/cover.jpg',
        isVerified: true,
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Simula o erro de 'Usuário já existe' quando tenta criar um novo usuário
      jest.spyOn(service, 'createUser').mockRejectedValue(new ConflictException('User already exists'));

      try {
        // Chama o método create do controller e aguarda a exceção
        await controller.create(createUserDto);
      } catch (error) {
        // Verifica se o erro lançado é do tipo 'ConflictException' e se a mensagem é a esperada
        expect(error).toBeInstanceOf(ConflictException);
        expect(error.message).toBe('User already exists');
      }
    });

    it('deve lançar erro se a data de nascimento for inválida', async () => {
      // Dados com data de nascimento inválida (passando uma string inválida)
      const invalidUserDto: CreateUserDto = {
        id: '123',
        name: 'John Doe',
        email: 'john@example.com',
        passwordHash: 'hashedPassword123',
        username: 'johndoe',
        dateOfBirth: 'invalid-date' as any, // Passando uma data inválida
        phoneNumber: '+5511987654321',
        bio: 'Developer',
        profilePicture: 'https://example.com/profile.jpg',
        coverPicture: 'https://example.com/cover.jpg',
        isVerified: true,
        status: 'active',
        lastLogin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Simula o erro de 'Data de nascimento inválida'
      jest.spyOn(service, 'createUser').mockRejectedValue(new BadRequestException('Invalid date of birth'));

      try {
        // Chama o método create do controller e aguarda a exceção
        await controller.create(invalidUserDto);
      } catch (error) {
        // Verifica se o erro lançado é do tipo 'BadRequestException' e se a mensagem é a esperada
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Invalid date of birth');
      }
    });
  });
});