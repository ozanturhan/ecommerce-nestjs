import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from '../../../repositories';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { CoreModule } from '../../core/core.module';

@Module({
  imports: [CoreModule, TypeOrmModule.forFeature([CategoryRepository])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
