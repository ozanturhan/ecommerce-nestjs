import { ApiProperty } from '@nestjs/swagger';
import { Image, Store } from '../../../models';

export class CatalogProduct {
  @ApiProperty()
  id: number;

  @ApiProperty()
  listPrice: number;

  @ApiProperty()
  salePrice: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: string;

  @ApiProperty()
  unit: string;

  @ApiProperty()
  barcode: string;

  @ApiProperty()
  taxRate: number;

  @ApiProperty()
  brand: string;

  @ApiProperty()
  model: string;

  @ApiProperty()
  images: Image[];

  @ApiProperty()
  store: Store;
}
