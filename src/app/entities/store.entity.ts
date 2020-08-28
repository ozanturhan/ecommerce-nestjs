import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IStore, IStoreProduct } from '../interfaces';

@Entity('store')
export class StoreEntity implements IStore {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @OneToMany('StoreProductEntity', 'store')
  storeProducts: IStoreProduct[];
}
