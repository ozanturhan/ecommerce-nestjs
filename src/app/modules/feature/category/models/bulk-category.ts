import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class BulkCategory {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: BulkCategory })
  children: BulkCategory[];
}
