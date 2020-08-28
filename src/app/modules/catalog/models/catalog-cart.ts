import { ApiProperty } from '@nestjs/swagger';
import { CatalogCartItem } from './catalog-cart-item';

export class CatalogCart {
  @ApiProperty()
  total: number;

  @ApiProperty()
  subTotal: number;

  @ApiProperty()
  taxAmount: number;

  @ApiProperty({ type: [CatalogCartItem] })
  items: CatalogCartItem[];
}
