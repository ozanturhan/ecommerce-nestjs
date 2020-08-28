import { Controller, Get, Param } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CatalogBrandService } from '../services';
import { Brand } from '../../../models';
import { ApiFilterQuery, Filter } from '../../../decorators';
import { IFilter } from '../../../interfaces';
import { Model } from '../../../models/model';

@Controller('/catalog/brands')
@ApiTags('brand')
export class CatalogBrandController {
  constructor(private brandService: CatalogBrandService) {}

  @Get('/')
  @ApiFilterQuery()
  @ApiOkResponse({ type: [Brand] })
  getBrands(@Filter() filter: IFilter): Promise<Brand[]> {
    return this.brandService.findByFilter(filter);
  }

  @Get('/:brandId/models')
  @ApiFilterQuery({ model: false })
  @ApiOkResponse({ type: [Brand] })
  getModels(@Param('brandId') brandId: number, @Filter() filter: IFilter): Promise<Model[]> {
    return this.brandService.findByBrandAndFilters(brandId, filter);
  }
}
