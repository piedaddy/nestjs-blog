import {
  Controller,
  Get,
  Post,
  Patch,
  Put,
  Delete,
  Param,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe, // not a decorator, but used with decorators
  DefaultValuePipe,
  ValidationPipe,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  ClassSerializerInterceptor,
  // Req,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';

import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

//import { Request } from 'express';

//name the controller here so that now everytime a request comes to path/users, it will come to this place
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // must have all mandatory params before optional params
  // cannot validate optional params
  // order of pipes matters!!! if ParseIntPipe was before DefaultValuePipe, validation would fail bc youre trying to validate a nonexisting param!
  //// but if there is a default given before ParseIntPipe, it's fine
  @Get('/:id?')
  @ApiOperation({
    summary: 'Fetches a list of registered users of an application',
  })
  //can have multiple ApiResponse decorators for different types of responses
  @ApiResponse({
    status: 200,
    description: 'Users fetched successfully based on the query',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'Number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description: 'Position of page number that you want the API to return',
    example: 1,
  })
  // public getUsers(@Param() params: any, @Query() query: any) {
  // console.log('params', params, 'query', query);
  // public getUsers(
  //   @Param('id', ParseIntPipe) id: number | undefined, // undefined bc id is optional
  //   @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
  //   @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  // ) {
  //   //can get more specific with adding the name of the param or query we want
  //   console.log('id', typeof id, id, 'limit', limit, 'page', page);
  //   return 'You sent a GET request to the users endpoint';
  // }
  public getUsers(
    @Param()
    getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.findAll(getUsersParamDto, limit, page);
  }

  // @Post()
  // public createUsers(
  //   @Body(new ValidationPipe()) request: CreateUserDto,
  //   @Headers() headers: any,
  //   @Ip() ip: any,
  // ) {
  //   // also possible => public createUsers(@Req() request: Request) {
  //   // now using it from express - it will give much more data
  //   // only use it when you want to modify the underlying express request
  //   console.log('request', request);
  //   console.log('headers', headers);
  //   console.log('Ip', ip);
  //   return 'You sent a POST request to the users endpoint';
  // }

  @Post()
  // public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  // createUserDto parameter is currently not an instance of CreateUserDto, it's just an object
  // it should be an instance for better type safety
  // @SetMetadata('authType', 'none')
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }

  // no longer needed bc we imported it into the app.module
  // @UseGuards(AccessTokenGuard)
  @Post('create-many')
  public createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
    return this.usersService.createMany(createManyUsersDto);
  }
}
