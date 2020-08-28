import { IStoreProduct } from './store-product.interface';
import { IUser } from './user.interface';

export interface ICartItem {
  id: number;
  storeProduct: IStoreProduct;
  user: IUser;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
