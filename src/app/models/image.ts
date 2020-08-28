import { ApiProperty } from '@nestjs/swagger';
import { IImage } from '../interfaces';

export class Image implements IImage {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;
}
