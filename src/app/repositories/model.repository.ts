import { EntityRepository, Repository } from 'typeorm';
import { ModelEntity } from '../entities';
import { IFilter } from '../interfaces';
import { applyFilter } from '../utils/apply-filter';

@EntityRepository(ModelEntity)
export class ModelRepository extends Repository<ModelEntity> {
  async findByBrandAndFilters(
    brandId: number,
    filter: IFilter,
  ): Promise<ModelEntity[]> {
    const qb = this.createQueryBuilder('model')
      .addSelect('COUNT(DISTINCT store_product.id)', 'model_product_count')
      .innerJoin('model.brand', 'brand')
      .innerJoin('model.products', 'product')
      .innerJoin('product.categories', 'category')
      .innerJoin('product.storeProducts', 'store_product')
      .where('brand.id = :brandId', { brandId });

    applyFilter(qb, filter, { model: false });

    qb.groupBy('model.id');

    return qb.getMany();
  }
}
