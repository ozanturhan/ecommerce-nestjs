import { IBrand } from './brand.interface';
import { IProductCount } from './product-count.interface';

export interface IModel extends IProductCount {
  id: number;
  name: string;
  brand: IBrand;
}
