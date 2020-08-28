import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAddress, ICity, IDistrict, ITown } from '../interfaces';

@Entity('town')
export class TownEntity implements ITown {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('CityEntity', 'towns')
  city: ICity;

  @OneToMany('DistrictEntity', 'town')
  districts: IDistrict[];

  @OneToMany('AddressEntity', 'user')
  addresses: IAddress[];
}
