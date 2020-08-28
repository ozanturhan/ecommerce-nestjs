import { CatalogCartItem } from '../models';
import { CatalogProductMapper } from './catalog-product-mapper';
import { ICartItem } from '../../../interfaces';

export class CatalogCartItemMapper {
  static mapToCatalogCartItem(cartItem: ICartItem): CatalogCartItem {
    const { storeProduct, ...item } = cartItem;
    return {
      ...item,
      product: CatalogProductMapper.mapToCatalogProduct(storeProduct),
    };
  }
}
