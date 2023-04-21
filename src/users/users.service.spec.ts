import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from './../prisma.service';

describe('UsersService - Main Flow', () => {
  //é uma boa prática usar o nome sut, (system under test)
  let sut: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should to create  a new user and show it', async () => {
    //Aqui é o mock dos dados
    prisma.user.create = jest.fn().mockResolvedValue({
      id: 'any_id1',
      email: 'anyemail1@example.com',
      name: 'any_name1',
      post: [],
    });

    //Mandando criar o usuário
    const result = await sut.create({
      email: 'anyemail1@example.com',
      name: 'any_name1',
      post: [],
    });

    //Avaliando o retorno
    expect(result).toMatchObject({
      email: 'anyemail1@example.com',
      name: 'any_name1',
      post: [],
    });
  });
});

describe('UsersService - Alternative Flow', () => {
  //é uma boa prática usar o nome sut, (system under test)
  let sut: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  it('should not to create  a new user if the email is missing and throw a error', async () => {
    //Avaliando o retorno do jeito 1
    // expect(
    //   sut.create({
    //     email: null,
    //     name: 'any_name1',
    //     post: [],
    //   }),
    // ).rejects.toThrowError('The email field is missing');

    //Avaliando o retorno do jeito 2
    expect(async () => {
      await sut.create({
        email: null,
        name: 'aaa',
        post: [],
      });
    }).rejects.toThrowError('The email field is missing');
  });

  it('should not to create  a new user if the email is missing and throw a error', async () => {
    //Avaliando o retorno do jeito 1
    // expect(
    //   sut.create({
    //     email: null,
    //     name: 'any_name1',
    //     post: [],
    //   }),
    // ).rejects.toThrowError('The email field is missing');

    //Avaliando o retorno do jeito 2
    expect(async () => {
      await sut.create({
        email: 'any_email',
        name: null,
        post: [],
      });
    }).rejects.toThrowError('The name field is missing');
  });
});
