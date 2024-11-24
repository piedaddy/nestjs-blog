// import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  // no longer needed bc we enabled enableImplicitConversion
  // could make a max value
  limit?: number = 10;

  @IsOptional()
  @IsPositive()
  //   @Type(() => Number)
  // no longer needed bc we enabled enableImplicitConversion
  page?: number = 1;
}
