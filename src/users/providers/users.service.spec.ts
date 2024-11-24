import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { FindOneUserByGoogleIdProvider } from './find-one-user-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateUserProvider } from './create-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,

        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider, // this is the mocking
        },

        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} }, // these take care of adding User Repository

        {
          provide: CreateGoogleUserProvider,
          useValue: {}, // this is the mocking
        },
        {
          provide: FindOneUserByGoogleIdProvider,
          useValue: {}, // this is the mocking
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: {}, // this is the mocking
        },
        {
          provide: UsersCreateManyProvider,
          useValue: {}, // this is the mocking
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined"', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should be defined', () => {
      expect(service.createUser).toBeDefined();
    });
    it('should call create user on createUserProvider', async () => {
      const user = await service.createUser({
        firstName: 'Gaby',
        lastName: 'Wildfeuer',
        email: 'testEmail@gmail.com',
        password: '123password',
      });
      expect(user.firstName).toEqual('Gaby');
    });
  });
});
