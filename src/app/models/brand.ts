import { ApiProperty } from '@nestjs/swagger';
import { IBrand } from '../interfaces';

export class Brand implements IBrand {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  productCount: number;
}
