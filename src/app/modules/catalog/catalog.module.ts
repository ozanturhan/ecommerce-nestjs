import { Module } from '@nestjs/common';
import {
  CatalogBrandController,
  CatalogCategoryController,
  CatalogProductController,
} from './controllers';
import { CategoryModule } from '../feature/category/category.module';
import { CatalogCartController } from './controllers/catalog-cart.controller';
import {
  CatalogBrandService,
  CatalogCartService,
  CatalogCategoryService,
  CatalogProductService,
} from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  BrandRepository,
  CartItemRepository,
  CategoryRepository,
  ModelRepository,
  ProductRepository,
  StoreProductRepository,
} from '../../repositories';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StoreProductRepository,
      ProductRepository,
      BrandRepository,
      CartItemRepository,
      CategoryRepository,
      BrandRepository,
      ModelRepository,
    ]),
    CoreModule,
    CategoryModule,
  ],
  controllers: [
    CatalogBrandController,
    CatalogProductController,
    CatalogCategoryController,
    CatalogCartController,
  ],
  providers: [
    CatalogProductService,
    CatalogCategoryService,
    CatalogCartService,
    CatalogBrandService,
  ],
})
export class CatalogModule {}
