import { createParamDecorator } from '@nestjs/common';
import { IFilter } from '../interfaces';
import { PaginationOptions } from '../modules/core/modules/pagination';

export const Filter = createParamDecorator((data, req) => {
  const query = req?.args[0]?.query;

  const brand = query?.brand?.split(',');
  const model = query?.model?.split(',');
  const category = query?.category;

  const page = query?.page || 1;
  const limit = query?.limit || 10;

  const pagination = {
    page,
    limit,
  } as PaginationOptions;

  return {
    brand,
    model,
    category,
    pagination,
  } as IFilter;
});
