import { Module } from '@nestjs/common';
import { PaginationModule } from './modules/pagination';
import { TransformModule } from './modules/transform';

@Module({
  controllers: [],
  providers: [],
  exports: [PaginationModule, TransformModule],
  imports: [PaginationModule, TransformModule],
})
export class CoreModule {}
