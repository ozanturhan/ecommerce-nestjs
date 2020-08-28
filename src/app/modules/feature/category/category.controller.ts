import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { AppAuth } from '../../../decorators';
import { BulkCategory } from './models/bulk-category';

// todo: bu controller dış api tasarlandığında oraya taşınacak
@AppAuth()
@Controller('/categories')
@ApiTags('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/bulk')
  @ApiBody({ type: [BulkCategory] })
  @HttpCode(HttpStatus.NO_CONTENT)
  async insertAll(
    @Body(new ParseArrayPipe({ items: BulkCategory }))
    categories: BulkCategory[],
  ) {
    await this.categoryService.bulkSave(categories);
  }

  @Get('/cache/clear')
  @AppAuth('admin')
  @ApiResponse({ description: 'todo', status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  clearCache(@Query() query) {
    return this.categoryService.clearCache();
  }
}
