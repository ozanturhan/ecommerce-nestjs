import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IAddress, IAddressType } from '../interfaces';

@Entity('address_type')
export class AddressTypeEntity implements IAddressType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany('AddressEntity', 'type')
  addresses: IAddress[];
}
