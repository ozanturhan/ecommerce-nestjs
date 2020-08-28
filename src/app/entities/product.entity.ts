import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IBrand, ICategory, IImage, IModel, IProduct, IStoreProduct } from '../interfaces';

@Entity('product')
export class ProductEntity implements IProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar', { length: 255 })
  code: string;

  @Column('varchar', { length: 255 })
  unit: string;

  @Column('varchar', { length: 64, unique: true })
  barcode: string;

  @Column('smallint', { name: 'tax_rate' })
  taxRate: number;

  @ManyToMany('CategoryEntity', 'products')
  @JoinTable()
  categories: ICategory[];

  @OneToMany('StoreProductEntity', 'product')
  storeProducts: IStoreProduct;

  @ManyToOne('BrandEntity', 'products')
  brand: IBrand;

  @ManyToOne('ModelEntity', 'products', { nullable: true })
  model: IModel;

  @OneToMany('ImageEntity', 'store')
  images: IImage[];
}
