import { EntityRepository, Repository } from 'typeorm';
import { CategoryEntity } from '../entities';
import { IFilter } from '../interfaces';
import { applyFilter } from '../utils/apply-filter';

@EntityRepository(CategoryEntity)
export class CategoryRepository extends Repository<CategoryEntity> {
  findByFilter(filter: IFilter): Promise<CategoryEntity[]> {
    const qb = this.createQueryBuilder('category')
      .addSelect('COUNT(DISTINCT store_product.id)', 'category_product_count')
      .innerJoin('category.products', 'product')
      .innerJoin('product.brand', 'brand')
      .innerJoin('product.storeProducts', 'store_product')
      .leftJoin('product.model', 'model');

    applyFilter(qb, filter, { category: false });

    if (!filter.category) {
      qb.andWhere('category.parent is null');
    } else {
      qb.andWhere('category.parent = :parent', { parent: filter.category });
    }

    qb.groupBy('category.id');

    //queryBuild.cache(Tools.createKeyForQueryCache('categories', options));
    return qb.getMany();
  }

  async clearCache() {
    await this.manager.connection.query(
      `DELETE FROM query_result_cache WHERE identifier LIKE 'categories%'`,
    );
  }
}
