import { CatalogProduct } from '../models';
import { IStoreProduct } from '../../../interfaces';

export class CatalogProductMapper {
  static mapToCatalogProduct(storeProduct: IStoreProduct): CatalogProduct {
    return {
      id: storeProduct.id,
      listPrice: storeProduct.listPrice,
      salePrice: storeProduct.salePrice,
      quantity: storeProduct.quantity,
      name: storeProduct.product.name,
      code: storeProduct.product.code,
      unit: storeProduct.product.unit,
      barcode: storeProduct.product.barcode,
      taxRate: storeProduct.product.taxRate,
      brand: storeProduct.product.brand.name,
      model: storeProduct?.product?.model?.name,
      images: storeProduct.product.images,
      store: storeProduct.store,
    };
  }
}
