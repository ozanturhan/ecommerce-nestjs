import { ApiProperty } from '@nestjs/swagger';
import { IAddressType } from '../interfaces';

export class AddressType implements IAddressType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
