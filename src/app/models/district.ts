import { ApiProperty } from '@nestjs/swagger';
import { IDistrict } from '../interfaces';

export class District implements IDistrict {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
