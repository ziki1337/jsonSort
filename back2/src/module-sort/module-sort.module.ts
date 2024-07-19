import { Module } from '@nestjs/common';
import { ModuleSortService } from './module-sort.service';

@Module({
  providers: [ModuleSortService]
})
export class ModuleSortModule {}
