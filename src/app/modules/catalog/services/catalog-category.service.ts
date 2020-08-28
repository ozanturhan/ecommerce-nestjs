import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../interfaces';
import { CatalogCategory } from '../models';
import { CategoryRepository } from '../../../repositories';
import { TransformService } from '../../core/modules/transform';

@Injectable()
export class CatalogCategoryService {
  constructor(
    private storeProductRepository: CategoryRepository,
    private transformService: TransformService,
  ) {}

  async findByFilter(filter: IFilter): Promise<CatalogCategory[]> {
    const categories = await this.storeProductRepository.findByFilter(filter);
    return this.transformService.plainToClass(CatalogCategory, categories);
  }
}
