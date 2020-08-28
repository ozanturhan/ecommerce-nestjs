import { AddressType } from './address-type';
import { User } from './user';
import { City } from './city';
import { District } from './district';
import { ApiProperty } from '@nestjs/swagger';
import { Town } from './town';
import { IAddress } from '../interfaces';

export class Address implements IAddress {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ type: AddressType })
  type: AddressType;

  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: City })
  city: City;

  @ApiProperty({ type: Town })
  town: Town;

  @ApiProperty({ type: District })
  district: District;

  @ApiProperty()
  defaultPhone: string;

  @ApiProperty()
  detail: string;

  @ApiProperty()
  secondPhone: string;

  @ApiProperty()
  directions: string;
}
