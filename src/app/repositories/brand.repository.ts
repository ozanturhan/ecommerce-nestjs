import { EntityRepository, Repository } from 'typeorm';
import { BrandEntity } from '../entities';
import { IFilter } from '../interfaces';
import { applyFilter } from '../utils/apply-filter';

@EntityRepository(BrandEntity)
export class BrandRepository extends Repository<BrandEntity> {
  async findByFilters(filter: IFilter): Promise<BrandEntity[]> {
    const qb = this.createQueryBuilder('brand')
      .addSelect('COUNT(DISTINCT store_product.id)', 'brand_product_count')
      .innerJoin('brand.products', 'product')
      .innerJoin('product.storeProducts', 'store_product')
      .leftJoin('brand.models', 'model')
      .leftJoin('product.categories', 'category');

    applyFilter(qb, filter);

    qb.groupBy('brand.id');

    return qb.getMany();
  }
}
