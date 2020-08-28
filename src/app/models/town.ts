import { ApiProperty } from '@nestjs/swagger';
import { ITown } from '../interfaces';

export class Town implements ITown {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
