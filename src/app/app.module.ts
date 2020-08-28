import { Module } from '@nestjs/common';
import { FeatureModule } from './modules/feature/feature.module';
import { AddressModule } from './modules/address/address.module';
import { AuthModule } from './modules/auth/auth.module';
import { ImageModule } from './modules/image/image.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), FeatureModule, CatalogModule, AddressModule, AuthModule, ImageModule],
})
export class AppModule {
  constructor(private connection: Connection) {
    //connection.dropDatabase();
  }
}
