import { ICategory } from './category.interface';
import { IBrand } from './brand.interface';
import { IModel } from './model.interface';
import { IImage } from './image.interface';

export interface IProduct {
  id: number;
  name: string;
  code: string;
  barcode: string;
  unit: string;
  taxRate: number;
  brand: IBrand;
  model: IModel;
  categories: ICategory[];
  images: IImage[];
}
