import { ApiProperty } from '@nestjs/swagger';
import { IStore } from '../interfaces';

export class Store implements IStore {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
