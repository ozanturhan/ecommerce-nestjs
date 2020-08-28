import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { IPagination } from './pagination.interfaces';

export class Pagination<T> implements IPagination<T> {
  @ApiProperty({ type: Object, isArray: true })
  @Type(options => (options.newObject as Pagination<T>).type)
  items: T[];

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalPage: number;

  @ApiProperty()
  currentPage: number;

  @ApiProperty()
  limit: number;

  @Exclude()
  private type: Function;

  constructor(type: Function) {
    this.type = type;
  }
}
