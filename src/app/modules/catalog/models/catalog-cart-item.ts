import { CatalogProduct } from './catalog-product';
import { ApiProperty } from '@nestjs/swagger';

export class CatalogCartItem {
  @ApiProperty()
  id: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: CatalogProduct })
  product: CatalogProduct;
}
