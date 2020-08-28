import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ApiFilterQuery, Filter } from '../../../decorators';
import { IFilter } from '../../../interfaces';
import { CatalogCategory } from '../models';
import { CatalogCategoryService } from '../services';

@Controller('/catalog/categories')
@ApiTags('category')
export class CatalogCategoryController {
  constructor(private catalogCategoryService: CatalogCategoryService) {}

  @ApiFilterQuery()
  @Get('/')
  @ApiOkResponse({ type: [CatalogCategory] })
  getMainCategories(@Filter() filter: IFilter) {
    return this.catalogCategoryService.findByFilter(filter);
  }
}
