import { Type } from 'class-transformer';
import { CreateUserDto } from './create-user.dto';
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

//PartialType makes all properties options
export class CreateManyUsersDto {
  @ApiProperty({ type: 'array', required: true, items: { type: 'User' } })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
