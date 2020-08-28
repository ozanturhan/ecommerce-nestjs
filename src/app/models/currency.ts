import { ApiProperty } from '@nestjs/swagger';
import { ICurrency } from '../interfaces';

export class Currency implements ICurrency {
  @ApiProperty()
  id: number;

  @ApiProperty()
  code: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  symbol: string;

  @ApiProperty()
  exchangeRate: number;
}
