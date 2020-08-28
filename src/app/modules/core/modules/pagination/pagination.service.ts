import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SelectQueryBuilder } from 'typeorm';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';
import { PaginationOptions } from './pagination.interfaces';
import { Pagination } from './pagination';

@Injectable()
export class PaginationService {
  constructor(private em: EntityManager) {}

  async paginate(
    queryBuilder: SelectQueryBuilder<any>,
    options: PaginationOptions,
    mapper?: (item) => any,
  ): Promise<Pagination<any>> {
    const { limit, page } = options;

    const items = await queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getMany();

    if (items.length === 0) {
      throw new HttpException('there is no item', HttpStatus.NO_CONTENT);
    }

    let query = queryBuilder.getQuery();
    const parameters = queryBuilder.getParameters();
    if (Object.values(parameters).length) {
      Object.keys(parameters).forEach(key => {
        const regexp = key => new RegExp(`:${key}`, 'g');
        if (Array.isArray(parameters[key])) {
          const val = (parameters[key] as string[]).join(',');
          query = query.replace(regexp(key), val);
        } else {
          query = query.replace(regexp(key), parameters[key]);
        }
      });
    }

    const countQuery = `SELECT COUNT(*) as count FROM (${query}) AS tbl`;
    const countResult = await this.em.connection.query(countQuery);

    const total = +countResult[0].count;

    return Promise.resolve({
      items: mapper ? items.map(mapper) : items,
      total,
      totalPage: Math.ceil(total / limit),
      currentPage: +page,
      limit,
    } as Pagination<any>);
  }
}
