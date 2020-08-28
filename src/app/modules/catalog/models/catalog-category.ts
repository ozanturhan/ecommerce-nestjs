import { ApiProperty } from '@nestjs/swagger';

export class CatalogCategory {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  isMain: boolean;

  @ApiProperty()
  productCount: number;
}
