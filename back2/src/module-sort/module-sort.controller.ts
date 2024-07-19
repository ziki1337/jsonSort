import { Controller, Get, Query } from '@nestjs/common';
import { ModuleSortService, User } from './module-sort.service';

@Controller('module-sort')
export class ModuleSortController {
    constructor(private readonly moduleSort: ModuleSortService) {}

  @Get()
  async getData(@Query('email') email: string, @Query('number') number?: string): Promise<User[]> {
    return this.moduleSort.find(email, number);
  }

}
