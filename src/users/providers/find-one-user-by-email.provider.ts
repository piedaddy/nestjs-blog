import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findOneByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOneBy({ email });
      if (user) {
        return user;
      }
      throw new UnauthorizedException('user does not exist');
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'could not find',
      });
    }
  }
}
