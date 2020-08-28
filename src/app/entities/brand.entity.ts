import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCount } from './product-count';
import { IBrand, IProduct } from '../interfaces';

@Entity('brand')
export class BrandEntity extends ProductCount implements IBrand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @OneToMany('ModelEntity', 'brand')
  models: IBrand[];

  @OneToMany('ProductEntity', 'brand')
  products: IProduct[];
}
