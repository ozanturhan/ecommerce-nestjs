import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  AddressRepository,
  AddressTypeRepository,
  CityRepository,
  DistrictRepository,
  TownRepository,
  UserRepository,
} from '../../repositories';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { AddressEntity } from '../../entities';
import { AddressRequest } from './models';
import { Address, User } from '../../models';
import { TransformService } from '../core/modules/transform';

@Injectable()
export class AddressService {
  constructor(
    private addressRepository: AddressRepository,
    private addressTypeRepository: AddressTypeRepository,
    private userRepository: UserRepository,
    private cityRepository: CityRepository,
    private townRepository: TownRepository,
    private districtRepository: DistrictRepository,
    private transformService: TransformService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}

  async createAddress(address: AddressRequest): Promise<Address> {
    const addressEntity = new AddressEntity();
    return this.saveAddress(addressEntity, address);
  }

  async updateAddress(
    addressId: number,
    addressRequest: AddressRequest,
  ): Promise<Address> {
    const address = await this.findAddressWithId(addressId);
    return this.saveAddress(address, addressRequest);
  }

  async deleteAddress(addressId: number): Promise<void> {
    const address = await this.findAddressWithId(addressId);
    await this.addressRepository.remove(address);
  }

  async findByUser(): Promise<Address[]> {
    const user = this.request['user'] as User;

    const addresses = await this.addressRepository.findByUser(user);

    return this.transformService.plainToClass(Address, addresses);
  }

  private async findAddressWithId(addressId: number) {
    const address = await this.addressRepository.findOne(addressId);

    if (!address) {
      throw new HttpException('Address Not Found', HttpStatus.NOT_FOUND);
    }

    return address;
  }

  private async saveAddress(
    addressEntity: AddressEntity,
    address: AddressRequest,
  ): Promise<Address> {
    const user = this.request['user'] as User;

    addressEntity.type = await this.addressTypeRepository.findOne(address.type);
    addressEntity.user = await this.userRepository.findOne(user.id);
    addressEntity.city = await this.cityRepository.findOne(address.city);
    addressEntity.town = await this.townRepository.findOne(address.town);
    addressEntity.district = await this.districtRepository.findOne(user.id);
    addressEntity.defaultPhone = address.defaultPhone;
    addressEntity.detail = address.detail;
    addressEntity.title = address.title;

    return this.transformService.plainToClass(
      Address,
      await this.addressRepository.save(addressEntity),
    );
  }
}
