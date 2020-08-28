import { IProductCount } from './product-count.interface';

export interface IBrand extends IProductCount {
  id: number;
  name: string;
}
