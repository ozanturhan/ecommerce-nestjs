import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

const defaultOptions = { model: true };

export function ApiFilterQuery(options?: { model: boolean }) {
  const { model } = { ...defaultOptions, ...options };

  const decorators = [
    ApiQuery({
      name: 'category',
      description: 'CatalogCategory Id',
      required: false,
    }),
    ApiQuery({ name: 'brand', description: 'Brand Id', required: false }),
    ApiQuery({
      name: 'minPrice',
      description: 'Minimum Price',
      required: false,
    }),
    ApiQuery({
      name: 'maxPrice',
      description: 'Maximum Price',
      required: false,
    }),
  ];

  if (model) {
    decorators.push(
      ApiQuery({ name: 'model', description: 'Model Id', required: false }),
    );
  }

  return applyDecorators(...decorators);
}
