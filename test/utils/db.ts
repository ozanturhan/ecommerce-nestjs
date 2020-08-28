import { TypeOrmModule } from '@nestjs/typeorm';
import {
  AddressEntity,
  AddressTypeEntity,
  BrandEntity,
  CartItemEntity,
  CategoryEntity,
  CityEntity,
  CurrencyEntity,
  DistrictEntity,
  ImageEntity,
  ModelEntity,
  ProductEntity,
  StoreEntity,
  StoreProductEntity,
  TownEntity,
  UserEntity,
} from '../../src/app/entities';

export function createDbModule(): any {
  return TypeOrmModule.forRoot({
    entities: [
      ProductEntity,
      CategoryEntity,
      StoreProductEntity,
      BrandEntity,
      ModelEntity,
      ImageEntity,
      StoreEntity,
      CurrencyEntity,
      CartItemEntity,
      UserEntity,
      AddressEntity,
      AddressTypeEntity,
      CityEntity,
      TownEntity,
      DistrictEntity,
    ],
    host: process.env.TYPEORM_HOST,
    port: 3306,
    type: 'mysql',
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: 'test_' + process.env.TYPEORM_DATABASE,
    synchronize: true,
  });
}
