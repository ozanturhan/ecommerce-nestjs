import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CatalogProductService } from '../services';
import { paginationFactory } from '../../../utils/pagination-item-factory';
import { IFilter } from '../../../interfaces';
import { ApiFilterQuery, Filter } from '../../../decorators';
import { CatalogProduct } from '../models';
import { Pagination } from '../../core/modules/pagination';

@Controller('/catalog/products')
@ApiTags('product')
export class CatalogProductController {
  constructor(private productService: CatalogProductService) {}

  @Get('/')
  @ApiFilterQuery()
  @ApiOkResponse({ type: paginationFactory(CatalogProduct) })
  async getAll(@Filter() filter: IFilter): Promise<Pagination<CatalogProduct>> {
    return this.productService.findByFilter(filter);
  }
}
