import { IProductCount } from './product-count.interface';
import { IProduct } from './product.interface';

export interface ICategory extends IProductCount {
  id: number;
  name: string;
  isMain: boolean;
  parent: ICategory;
  children: ICategory[];
  products: IProduct[];
}
