import { Injectable } from '@nestjs/common';
import { IFilter } from '../../../interfaces';
import { Brand } from '../../../models';
import { BrandRepository, ModelRepository } from '../../../repositories';
import { Model } from '../../../models/model';
import { TransformService } from '../../core/modules/transform';

@Injectable()
export class CatalogBrandService {
  constructor(
    private brandRepository: BrandRepository,
    private modelRepository: ModelRepository,
    private transform: TransformService,
  ) {}

  async findByFilter(filter: IFilter): Promise<Brand[]> {
    return this.transform.plainToClass(
      Brand,
      await this.brandRepository.findByFilters(filter),
    );
  }

  async findByBrandAndFilters(
    brandId: number,
    filter: IFilter,
  ): Promise<Model[]> {
    return this.transform.plainToClass(
      Model,
      await this.modelRepository.findByBrandAndFilters(brandId, filter),
    );
  }
}
