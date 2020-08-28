import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {
  IAddress,
  IAddressType,
  ICity,
  IDistrict,
  ITown,
  IUser,
} from '../interfaces';

@Entity('address')
export class AddressEntity implements IAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  defaultPhone: string;

  @Column({ nullable: true })
  secondPhone: string;

  @Column({ nullable: false })
  detail: string;

  @Column({ nullable: true })
  directions: string;

  @ManyToOne('AddressTypeEntity', 'addresses', { nullable: false })
  type: IAddressType;

  @ManyToOne('UserEntity', 'addresses', { nullable: false })
  user: IUser;

  @ManyToOne('CityEntity', 'addresses', { nullable: false })
  city: ICity;

  @ManyToOne('TownEntity', 'addresses', { nullable: false })
  town: ITown;

  @ManyToOne('DistrictEntity', 'addresses', { nullable: false })
  district: IDistrict;
}
