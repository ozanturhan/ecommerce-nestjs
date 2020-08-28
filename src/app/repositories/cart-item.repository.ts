import { EntityRepository, Repository } from 'typeorm';
import { CartItemEntity } from '../entities';

@EntityRepository(CartItemEntity)
export class CartItemRepository extends Repository<CartItemEntity> {
  async findById(cartId: number): Promise<CartItemEntity> {
    return this.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.storeProduct', 'storeProduct')
      .leftJoinAndSelect('storeProduct.product', 'product')
      .leftJoinAndSelect('storeProduct.currency', 'currency')
      .leftJoinAndSelect('storeProduct.store', 'store')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.model', 'model')
      .where('cart.id = :cartId', { cartId })
      .getOne();
  }

  findItemsByUserId(userId: number) {
    return this.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.storeProduct', 'storeProduct')
      .leftJoinAndSelect('storeProduct.product', 'product')
      .leftJoinAndSelect('storeProduct.currency', 'currency')
      .leftJoinAndSelect('storeProduct.store', 'store')
      .leftJoinAndSelect('product.brand', 'brand')
      .leftJoinAndSelect('product.model', 'model')
      .where('cart.userId = :userId', { userId })
      .orderBy('cart.id', 'DESC')
      .getMany();
  }
}
