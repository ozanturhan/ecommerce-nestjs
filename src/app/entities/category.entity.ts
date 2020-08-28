import {
  Column,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCount } from './product-count';
import { ICategory, IProduct } from '../interfaces';

@Entity('category')
@Index(['name', 'parent'], { unique: true })
export class CategoryEntity extends ProductCount implements ICategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  isMain: boolean;

  @ManyToOne(
    () => CategoryEntity,
    category => category.children,
    { onDelete: 'CASCADE' },
  )
  parent: CategoryEntity;

  @OneToMany(
    () => CategoryEntity,
    category => category.parent,
    { cascade: true, nullable: false },
  )
  children: CategoryEntity[];

  @ManyToMany('ProductEntity', 'categories')
  products: IProduct[];

  constructor(name: string) {
    super();
    this.name = name;
  }
}
