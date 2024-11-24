import {
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingProvider)) // have to use inject bc it's a circular dependency
    private readonly hashingProvider: HashingProvider,

    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    //check if user already exists with same email

    let existingUser = undefined;
    try {
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      console.log('error', error);
      throw new RequestTimeoutException(`couldn't connect to the DB`, {
        description: 'error connecting to DB',
      });
    }
    //if user exists =>
    if (existingUser) {
      throw new BadRequestException(`there is already a user with that email`, {
        description: 'duplicate email',
      });
    }
    //if user doesnt exist =>
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      console.log('saving new user error', error);
      throw new RequestTimeoutException(`error saving the new user`, {
        description: `couldn't save new user`,
      });
    }

    try {
      await this.mailService.sendUserWelcome(newUser);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return newUser;
  }
}
