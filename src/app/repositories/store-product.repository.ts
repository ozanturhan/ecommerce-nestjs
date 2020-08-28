import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { StoreProductEntity } from '../entities';
import { IFilter } from '../interfaces';
import { applyFilter } from '../utils/apply-filter';

@EntityRepository(StoreProductEntity)
export class StoreProductRepository extends Repository<StoreProductEntity> {
  findByFilter(filter: IFilter): SelectQueryBuilder<StoreProductEntity> {
    const qb = this.createQueryBuilder('store_product')
      //.leftJoin('store_product', 'p2', 'store_product.productId = p2.productId AND store_product.salePrice < p2.salePrice')
      .innerJoinAndSelect('store_product.product', 'product')
      .innerJoinAndSelect('store_product.currency', 'currency')
      .innerJoinAndSelect('store_product.store', 'store')
      .innerJoinAndSelect('product.categories', 'category')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.model', 'model');

    applyFilter(qb, filter);

    qb.groupBy('store_product.id');
    return qb;
    //.groupBy('store_product.productId')
  }
}
