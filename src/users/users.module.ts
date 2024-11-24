import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthModule } from 'src/auth/auth.module';
import profileConfig from './config/profile.config';
import jwtConfig from 'src/auth/config/jwt.config';

import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { User } from './user.entity';
import { FindOneUserByGoogleIdProvider } from './providers/find-one-user-by-google-id.provider';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';

//cannot export controllers, only providers, bc theyre the ones with the injectable decorator
@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneUserByEmailProvider,
    FindOneUserByGoogleIdProvider,
    CreateGoogleUserProvider,
  ],
  exports: [UsersService],

  //using forwardRef bc there is a circular dependency between users and auth modules - they both need each other <3
  imports: [
    forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
    //
    ConfigModule.forFeature(profileConfig),

    // no longer needed as we added the auth guards globally in app.module
    // ConfigModule.forFeature(jwtConfig),
    // //asProvider returns same boiler plate code to make sure properly injected
    // JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
})
export class UsersModule {}
