import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CatalogCartService } from '../services';
import { AppAuth } from '../../../decorators';
import {
  CatalogCart,
  CatalogCartItem,
  CatalogCartUpdateRequest,
} from '../models';

@AppAuth()
@Controller('/catalog/cart')
@ApiTags('cart')
export class CatalogCartController {
  constructor(private cartService: CatalogCartService) {}

  @Get('/')
  @ApiOkResponse({ type: CatalogCart })
  getItems(): Promise<CatalogCart> {
    return this.cartService.findItemsByUser();
  }

  @Delete('/')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCart() {
    await this.cartService.clearCart();
  }

  @Post('/items/:id')
  @ApiOkResponse({ type: [CatalogCartItem] })
  save(@Param('id') id: number): Promise<CatalogCartItem> {
    return this.cartService.save(id);
  }

  @Patch('/items/:id')
  @ApiOkResponse({ type: [CatalogCartUpdateRequest] })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateQuantity(
    @Param('id') id: number,
    @Body() catalogCartUpdateRequest: CatalogCartUpdateRequest,
  ) {
    await this.cartService.update(id, catalogCartUpdateRequest);
  }

  @Delete('/items/:id')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteItem(@Param('id') id: number) {
    await this.cartService.delete(id);
  }
}
