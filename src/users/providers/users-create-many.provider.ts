import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  // HOW TO CREATE A TRANSACTION - RAW EDITION
  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];

    // create Query Runner instance
    const queryRunner = this.dataSource.createQueryRunner();
    // connect instance to data source

    try {
      await queryRunner.connect();
      // start transaction - can have multiple CRUD actions
      await queryRunner.startTransaction();
      // now whatever CRUD operations we perform, they would be apart of a single transaction
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to database', {
        description: String(error),
      });
    }

    // if successful, commit to DB
    try {
      for (const user of createManyUsersDto.users) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      // if unsuccessful, rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: String(error),
      });
    } finally {
      // release the connection
      // this final try/catch is not mandatory
      try {
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: String(error),
        });
      }
    }

    return newUsers;
  }
}
