import { PaginationOptions } from '../modules/core/modules/pagination';

export interface IFilter {
  brand: number[];
  model: number[];
  category: number[];
  pagination: PaginationOptions;
}
