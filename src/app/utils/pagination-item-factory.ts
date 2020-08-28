import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Pagination } from '../modules/core/modules/pagination';

class PaginationForSwagger<T> extends Pagination<T> {}

export function paginationFactory(type: any): typeof PaginationForSwagger {
  class Pagination<Entity> extends PaginationForSwagger<Entity> {
    @ApiModelProperty({ type, isArray: true })
    public items: Entity[];
  }
  return Pagination;
}
