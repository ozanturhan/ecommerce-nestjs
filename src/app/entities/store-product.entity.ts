import {
  AfterLoad,
  Column,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  ICartItem,
  ICurrency,
  IProduct,
  IStore,
  IStoreProduct,
} from '../interfaces';

@Entity('store_product')
@Index(['product', 'store'], { unique: true })
export class StoreProductEntity implements IStoreProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 13, scale: 6 })
  listPrice: number;

  @Column('decimal', { precision: 13, scale: 6 })
  salePrice: number;

  @Column('int')
  quantity: number;

  @ManyToOne('StoreEntity', 'storeProducts')
  store: IStore;

  @ManyToOne('CurrencyEntity', 'storeProducts')
  currency: ICurrency;

  @ManyToOne('ProductEntity', 'storeProducts')
  product: IProduct;

  @OneToMany('CartItemEntity', 'storeProduct')
  cartItems: ICartItem[];

  @AfterLoad()
  calculatePrices() {
    if (this.product) {
      //const kdv = (this.product.taxRate + 100) / 100;
      this.listPrice = this.currency.exchangeRate * this.listPrice;
      this.salePrice = this.currency.exchangeRate * this.salePrice;
    }
  }
}
