import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ICurrency, IStoreProduct } from '../interfaces';

@Entity('currency')
export class CurrencyEntity implements ICurrency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 1 })
  symbol: string;

  @Column('decimal', { precision: 13, scale: 6 })
  exchangeRate: number;

  @OneToMany('ProductEntity', 'currency')
  storeProducts: IStoreProduct;
}
