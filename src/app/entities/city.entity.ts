import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IAddress, ICity, ITown } from '../interfaces';

@Entity('city')
export class CityEntity implements ICity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: number;

  @OneToMany('TownEntity', 'city')
  towns: ITown[];

  @OneToMany('TownEntity', 'user')
  addresses: IAddress[];
}
