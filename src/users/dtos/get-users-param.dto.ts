import { IsOptional, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'ID of user',
    example: 1234,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number) // this is bc the id is coming in as a string
  id?: number;
}
