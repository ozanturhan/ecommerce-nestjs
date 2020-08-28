import { Injectable } from '@nestjs/common';
import { BrandRepository, StoreProductRepository } from '../../../repositories';
import { IFilter } from '../../../interfaces';
import { CatalogProduct } from '../models';
import { CatalogProductMapper } from '../mappers';
import { Pagination, PaginationService } from '../../core/modules/pagination';

@Injectable()
export class CatalogProductService {
  constructor(
    private storeProductRepository: StoreProductRepository,
    private brandRepository: BrandRepository,
    private pagination: PaginationService,
  ) {}

  async findByFilter(filter: IFilter): Promise<Pagination<CatalogProduct>> {
    return this.pagination.paginate(
      this.storeProductRepository.findByFilter(filter),
      filter.pagination,
      CatalogProductMapper.mapToCatalogProduct,
    );
  }
}
