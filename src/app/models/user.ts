import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IUser } from '../interfaces';

export class User implements IUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  @Exclude()
  password: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  iat: number;

  @ApiProperty()
  roles: string[];
}
