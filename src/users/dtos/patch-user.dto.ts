import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

//PartialType makes all properties options
export class PatchUserDto extends PartialType(CreateUserDto) {}
