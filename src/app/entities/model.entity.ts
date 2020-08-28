import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCount } from './product-count';
import { IBrand, IModel, IProduct } from '../interfaces';

@Entity('model')
export class ModelEntity extends ProductCount implements IModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @ManyToOne('BrandEntity', 'models')
  brand: IBrand;

  @OneToMany('ProductEntity', 'model')
  products: IProduct[];
}
