import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressRepository,
  AddressTypeRepository,
  CityRepository,
  DistrictRepository,
  TownRepository,
  UserRepository,
} from '../../repositories';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [
    CoreModule,
    TypeOrmModule.forFeature([
      AddressRepository,
      AddressTypeRepository,
      UserRepository,
      CityRepository,
      DistrictRepository,
      TownRepository,
    ]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}
