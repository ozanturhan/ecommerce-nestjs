import { ApiProperty } from '@nestjs/swagger';
import { IBrand, IModel } from '../interfaces';

export class Model implements IModel {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  brand: IBrand;

  @ApiProperty()
  productCount: number;
}
