import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import { AppModule } from './app/app.module';
import { AddressModule } from './app/modules/address/address.module';
import { CatalogModule } from './app/modules/catalog/catalog.module';
import { AuthModule } from './app/modules/auth/auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ImageModule } from './app/modules/image/image.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  console.log('APP_ENV:' + process.env.APP_ENV);
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(compression());
  app.use(helmet());
  app.use(cors());
  app.use(urlencoded({ extended: true }));
  app.use(json());

  const options = new DocumentBuilder()
    .setTitle('Çevremdekiler Catalog Documentation')
    .setDescription('Çevremdekiler API description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [AuthModule, AddressModule, ImageModule, CatalogModule],
  });

  SwaggerModule.setup('swagger/catalog', app, document);

  const options2 = new DocumentBuilder()
    .setTitle('Çevremdekiler Api Documentation')
    .setDescription('Çevremdekiler API description')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();

  const document2 = SwaggerModule.createDocument(app, options2);

  SwaggerModule.setup('swagger/api', app, document2);

  app.set();
  await app.listen(+process.env.PORT || 3333);
}

bootstrap();
