import {
  AfterLoad,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAddress, IUser } from '../interfaces';

@Entity('user', { schema: 'ecommerce' })
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'first_name', length: 100 })
  firstName: string;

  @Column('varchar', { name: 'last_name', length: 100 })
  lastName: string;

  @Column('varchar', { name: 'email', length: 255 })
  email: string;

  @Column('varchar', { name: 'password', length: 100 })
  password: string;

  @Column('boolean', { name: 'is_active', default: () => "'1'" })
  isActive: boolean;

  @Column('text', { name: 'roles' })
  roles: string[];

  @OneToMany('AddressEntity', 'user')
  addresses: IAddress[];

  @AfterLoad()
  parseRoles() {
    this.roles = ((this.roles as unknown) as string).split(',');
  }
}
