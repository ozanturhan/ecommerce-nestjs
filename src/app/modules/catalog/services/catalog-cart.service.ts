import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CartItemEntity, UserEntity } from '../../../entities';
import {
  CartItemRepository,
  StoreProductRepository,
} from '../../../repositories';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import {
  CatalogCart,
  CatalogCartItem,
  CatalogCartUpdateRequest,
} from '../models';
import { CatalogCartItemMapper } from '../mappers';

@Injectable()
export class CatalogCartService {
  constructor(
    private storeProductRepository: StoreProductRepository,
    private cartItemRepository: CartItemRepository,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async save(id: number): Promise<CatalogCartItem> {
    const cart = new CartItemEntity();
    const product = await this.storeProductRepository.findOne({ id });

    if (!product) {
      throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
    }

    cart.storeProduct = product;
    cart.quantity = 1;
    cart.user = this.request['user'] as UserEntity;

    await this.cartItemRepository.save(cart);

    const cartItemEntity = await this.cartItemRepository.findById(cart.id);

    return CatalogCartItemMapper.mapToCatalogCartItem(cartItemEntity);
  }

  async findItemsByUser(): Promise<CatalogCart> {
    const user = this.request['user'] as UserEntity;
    const cartItems = (
      await this.cartItemRepository.findItemsByUserId(user.id)
    ).map(CatalogCartItemMapper.mapToCatalogCartItem);

    let cart: CatalogCart = {
      total: 0,
      subTotal: 0,
      taxAmount: 0,
      items: null,
    };

    cart = cartItems.reduce((acc, item) => {
      const kdv = (item.product.taxRate + 100) / 100;
      const itemSubTotal = item.product.salePrice;
      const itemTotal = item.product.salePrice * kdv;
      const itemTaxAmount = itemTotal - itemSubTotal;

      return {
        ...acc,
        total: acc.total + itemTotal,
        subTotal: acc.subTotal + itemSubTotal,
        taxAmount: acc.subTotal + itemTaxAmount,
      };
    }, cart);

    cart.items = cartItems;

    return cart;
  }

  async update(
    id: number,
    catalogCartUpdateRequest: CatalogCartUpdateRequest,
  ): Promise<void> {
    const cartItemEntity = await this.cartItemRepository.findOne({ id });

    if (!cartItemEntity) {
      throw new HttpException('Cart Item Not Found', HttpStatus.NOT_FOUND);
    }

    cartItemEntity.quantity = catalogCartUpdateRequest.quantity;
    await this.cartItemRepository.save(cartItemEntity);
  }

  async delete(id: number): Promise<void> {
    const cartItemEntity = await this.cartItemRepository.findOne({ id });

    if (!cartItemEntity) {
      throw new HttpException('Cart Item Not Found', HttpStatus.NOT_FOUND);
    }

    await this.cartItemRepository.delete(id);
  }

  async clearCart(): Promise<void> {
    const user = this.request['user'] as UserEntity;
    await this.cartItemRepository.delete({ user });
  }
}
