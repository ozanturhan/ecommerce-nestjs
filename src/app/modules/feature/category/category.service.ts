import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../../repositories';
import { CategoryEntity } from '../../../entities';
import { BulkCategory } from './models/bulk-category';
import { TransformService } from '../../core/modules/transform';

@Injectable()
export class CategoryService {
  constructor(
    private storeProductRepository: CategoryRepository,
    private transformService: TransformService,
  ) {}

  async bulkSave(categories: BulkCategory[]): Promise<void> {
    const entities: CategoryEntity[] = this.transformService.plainToClass(
      CategoryEntity,
      categories,
    );

    try {
      await this.storeProductRepository.save(entities);
      await this.storeProductRepository.delete({ isMain: false, parent: null });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async clearCache(): Promise<void> {
    await this.storeProductRepository.clearCache();
  }
}
