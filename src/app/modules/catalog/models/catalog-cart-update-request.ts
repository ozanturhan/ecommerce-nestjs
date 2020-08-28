import { ApiProperty } from '@nestjs/swagger';

export class CatalogCartUpdateRequest {
  @ApiProperty()
  quantity: number;
}
