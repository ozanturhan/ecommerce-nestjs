import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CatalogModule } from '../../../../src/app/modules/catalog/catalog.module';
import { createDbModule } from '../../../utils/db';
import { Connection } from 'typeorm';
import { getConnectionToken } from '@nestjs/typeorm';

describe('CatalogBrandController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [createDbModule(), CatalogModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = app.get(getConnectionToken());
    await app.init();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/catalog/brands')
      .expect(200)
      .expect([]);
  });
});
