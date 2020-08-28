import { IStore } from './store.interface';
import { ICurrency } from './currency.interface';
import { IProduct } from './product.interface';

export interface IStoreProduct {
  id: number;
  listPrice: number;
  salePrice: number;
  quantity: number;
  store: IStore;
  currency: ICurrency;
  product: IProduct;
}
