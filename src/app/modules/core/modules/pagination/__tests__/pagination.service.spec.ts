import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Entity, PrimaryColumn, SelectQueryBuilder } from 'typeorm';
import { getConnectionToken, TypeOrmModule } from '@nestjs/typeorm';
import { PaginationService } from '../pagination.service';

@Entity()
export class TestEntity {
  @PrimaryColumn()
  id: number;

  constructor(id: number) {
    this.id = id;
  }
}

describe('PaginationService', () => {
  jest.setTimeout(30000);

  let app: TestingModule;
  let connection: Connection;
  let paginationService: PaginationService;
  let queryBuilder: SelectQueryBuilder<TestEntity>;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          entities: [TestEntity],
          host: process.env.TYPEORM_HOST,
          port: +process.env.TYPEORM_PORT,
          type: 'mysql',
          username: process.env.TYPEORM_USERNAME,
          password: process.env.TYPEORM_PASSWORD,
          database: 'test_' + process.env.TYPEORM_DATABASE,
          synchronize: true,
        }),
      ],
      providers: [PaginationService],
    }).compile();
    connection = app.get(getConnectionToken());
    queryBuilder = connection.createQueryBuilder(TestEntity, 't');
    paginationService = app.get(PaginationService);
  });

  afterEach(async () => {
    await connection.query('DROP TABLE test_entity');
    await app.close();
  });

  it('Can call paginate', async () => {
    const testRepository = connection.getRepository(TestEntity);
    await testRepository.insert(new TestEntity(1));
    const result = await paginationService.paginate(queryBuilder, {
      limit: 10,
      page: 1,
    });

    expect(result.total).toEqual(1);
    expect(result.totalPage).toEqual(1);
    expect(result.currentPage).toEqual(1);
    expect(result.limit).toEqual(10);
  });
});
