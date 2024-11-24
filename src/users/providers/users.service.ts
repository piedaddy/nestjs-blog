import {
  Injectable,
  forwardRef,
  Inject,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneUserByGoogleIdProvider } from './find-one-user-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

/** Class to connect users table and perform business operations */
@Injectable()
export class UsersService {
  constructor(
    // @Inject(forwardRef(() => AuthService))
    // private readonly authService: AuthService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    // private readonly configService: ConfigService,

    // this is the module-specific config

    // @Inject(profileConfig.KEY)
    // private readonly profileConfiguration: ConfigType<typeof profileConfig>,

    private readonly usersCreateManyProvider: UsersCreateManyProvider,

    private readonly createUserProvider: CreateUserProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    private readonly findOneUserByGoogleIdProvider: FindOneUserByGoogleIdProvider,

    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /** Method to get all users from database */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // console.log('profile', this.profileConfiguration);
    // const isAuth = this.authService.isAuthenticated();
    // return [
    //   {
    //     firstName: 'Gaby',
    //     email: 'gab@gab.com',
    //   },
    //   {
    //     firstName: 'Jan',
    //     email: 'jan@gajanb.com',
    //   },
    // ];
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'API endpoint does not exist',
      },
      HttpStatus.MOVED_PERMANENTLY,
      //third arg is not sent back to client, is info just for devs
      { cause: new Error(), description: 'occured bc endpoint moved' },
    );
  }

  /** Method to get one user from database by ID*/
  public async findOneById(id: number) {
    try {
      const foundUser = await this.usersRepository.findOneBy({ id });
      if (foundUser) {
        return foundUser;
      } else {
        throw new BadRequestException(`couldn't find the user by ID`, {
          description: `couldn't find the user by ID`,
        });
      }
    } catch (error) {
      console.log('error', error);
      throw new RequestTimeoutException(`couldn't connect to the DB`, {
        description: 'error connecting to DB',
      });
    }
  }
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneUserByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}
