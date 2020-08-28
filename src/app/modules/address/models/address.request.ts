import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AddressRequest {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  type: number;

  @ApiProperty()
  @IsNotEmpty()
  defaultPhone: string;

  @ApiProperty()
  secondPhone?: string;

  @ApiProperty()
  @IsNotEmpty()
  city: number;

  @ApiProperty()
  @IsNotEmpty()
  town: number;

  @ApiProperty()
  @IsNotEmpty()
  district: number;

  @ApiProperty()
  @IsNotEmpty()
  detail: string;

  @ApiProperty()
  directions: string;
}
