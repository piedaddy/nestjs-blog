import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';

@Module({
  providers: [PaginationProvider],
  controllers: [],
  imports: [],
  exports: [PaginationProvider],
})
export class PaginationModule {}
