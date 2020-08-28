import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IImage, IProduct } from '../interfaces';

@Entity('image')
export class ImageEntity implements IImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 100 })
  name: string;

  @Column('varchar', { length: 100 })
  path: string;

  @ManyToOne('ProductEntity', 'images')
  product: IProduct;
}
