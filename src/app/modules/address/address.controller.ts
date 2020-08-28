import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiNoContentResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Address } from '../../models';
import { AddressRequest } from './models';
import { AddressService } from './address.service';
import { AppAuth } from '../../decorators';

@AppAuth()
@Controller('/addresses')
@ApiTags('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post('/')
  @ApiOkResponse({ type: Address })
  async createAddress(@Body() address: AddressRequest): Promise<Address> {
    return this.addressService.createAddress(address);
  }

  @Put('/:id')
  @ApiOkResponse({ type: Address })
  async updateAddress(
    @Param('id') id: number,
    @Body() address: AddressRequest,
  ): Promise<Address> {
    return this.addressService.updateAddress(id, address);
  }

  @Delete('/:id')
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAddress(@Param('id') id: number) {
    await this.addressService.deleteAddress(id);
  }

  @Get('/')
  @ApiOkResponse({ type: [Address] })
  async getAddresses() {
    return this.addressService.findByUser();
  }
}
