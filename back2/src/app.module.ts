import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleSortModule } from './module-sort/module-sort.module';
import { ModuleSortController } from './module-sort/module-sort.controller';
import { ModuleSortService } from './module-sort/module-sort.service';

@Module({
  imports: [ModuleSortModule],
  controllers: [AppController, ModuleSortController],
  providers: [AppService, ModuleSortService],
})
export class AppModule {}
