import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './users/user.entity';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';

import { ConfigModule, ConfigService } from '@nestjs/config';
// import { appConfig } from './config/app.config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';
import { UploadsModule } from './uploads/uploads.module';
import { MailModule } from './mail/mail.module';

const ENV = process.env.NODE_ENV;
//apart from this and in some config module file, shouldn't use process, should get env from Config

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    AccessTokenGuard,
    // //now entire module is protected => also entire application is now guarded! so should really be only added to app.module
    // better to do this and then specifically select the endpoints that should be public
    { provide: APP_GUARD, useClass: AuthenticationGuard }, // used to be useClass: AccessTokenGuard before we made AuthenticationGuard
    { provide: APP_INTERCEPTOR, useClass: DataResponseInterceptor }, // ensures its applied globally - instead of putting it in main.ts
  ],

  imports: [
    UsersModule,
    PostsModule,
    TagsModule,
    MetaOptionsModule,
    // config by default will read from .env
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development']
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    //connecting to DB
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   entities: [],
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'gaby',
    //   host: 'localhost',
    //   database: 'nestjs-blog',
    //   //synchronize should only be used in development mode!!
    //   //it automatically creates DB schema, could result in data being lost
    //   //if it's false, we'd have to run migrations to update the DB
    //   synchronize: true,
    // }),

    // //can can inject and import dependencies - how it works without appConfig
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     // entities: [User],
    //     //must import the entities inside the modules for autoLoadEntities to work
    //     autoLoadEntities: true,
    //     //+ will convert the port to a number
    //     port: +configService.get('DATABASE_PORT'),
    //     username: configService.get('DATABASE_USER'),
    //     password: configService.get('DATABASE_PASSWORD'),
    //     host: configService.get('DATABASE_HOST'),
    //     database: configService.get('DATABASE_NAME'),
    //     synchronize: true,
    //   }),
    // }),

    //how it works with appConfig
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        port: configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        host: configService.get('database.host'),
        database: configService.get('database.name'),
        synchronize: configService.get('database.synchronize'),
      }),
    }),
    PaginationModule,
    //remember that we could have made jwtConfig global
    ConfigModule.forFeature(jwtConfig),
    //asProvider returns same boiler plate code to make sure properly injected
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UploadsModule,
    MailModule,
  ],
})
export class AppModule {}
