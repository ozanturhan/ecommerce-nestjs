import { ICity } from './city.interface';
import { ITown } from './town.interface';
import { IDistrict } from './district.interface';

export interface IAddress {
  id: number;
  title: string;
  defaultPhone: string;
  secondPhone: string;
  detail: string;
  directions: string;
  city: ICity;
  town: ITown;
  district: IDistrict;
}
