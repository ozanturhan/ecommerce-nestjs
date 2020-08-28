import { Column } from 'typeorm';
import { IProductCount } from '../interfaces';

export class ProductCount implements IProductCount {
  // todo: workaround https://github.com/typeorm/typeorm/issues/1822
  @Column('int', { name: 'product_count', select: false, nullable: true })
  readonly productCount: number;
}
