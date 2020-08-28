import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ICartItem, IStoreProduct, IUser } from '../interfaces';

@Entity('cart_item')
export class CartItemEntity implements ICartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @ManyToOne('StoreProductEntity', 'cartItems', { nullable: false })
  storeProduct: IStoreProduct;

  @ManyToOne('UserEntity', 'users')
  user: IUser;
}
