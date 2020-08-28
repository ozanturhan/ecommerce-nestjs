import { IFilter } from '../interfaces';
import { SelectQueryBuilder } from 'typeorm';

const defaultOptions = { category: true, model: true };

export function applyFilter(
  qb: SelectQueryBuilder<any>,
  filter: IFilter,
  options?: { category?: boolean; model?: boolean },
) {
  options = { ...defaultOptions, ...options };

  if (filter.brand) {
    qb.andWhere('brand.id IN (:brand)', { brand: filter.brand });
  }

  if (filter.model && options.model) {
    qb.andWhere('model.id IN (:model)', { model: filter.model });
  }

  if (filter.category && options.category) {
    qb.andWhere('category.id = :category', { category: filter.category });
  }
}
