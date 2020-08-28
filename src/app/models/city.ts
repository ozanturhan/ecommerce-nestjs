import { ApiProperty } from '@nestjs/swagger';
import { ICity } from '../interfaces';

export class City implements ICity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  code: number;
}
