import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAddress, IDistrict, ITown } from '../interfaces';

@Entity('district')
export class DistrictEntity implements IDistrict {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne('TownEntity', 'districts')
  town: ITown;

  @OneToMany('AddressEntity', 'district')
  addresses: IAddress[];
}
