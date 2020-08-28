import { createDbModule } from '../utils/db';
import { Test, TestingModule } from '@nestjs/testing';
import { getConnectionToken, getCustomRepositoryToken } from '@nestjs/typeorm';
import { Connection, getCustomRepository } from 'typeorm';
import {
  AddressEntity,
  AddressTypeEntity,
  CityEntity,
  DistrictEntity,
  TownEntity,
  UserEntity,
} from '../../src/app/entities';
import { AddressRepository } from '../../src/app/repositories';
import { PaginationService } from '../../src/app/modules/core/modules/pagination';
import { User } from '../../src/app/models';

describe('Address Repository', () => {
  let app: TestingModule;
  let connection: Connection;
  let addressRepository: AddressRepository;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [createDbModule()],
      providers: [
        PaginationService,
        { provide: getCustomRepositoryToken(AddressRepository), useClass: AddressRepository },
      ],
    }).compile();

    connection = app.get(getConnectionToken());
    addressRepository = getCustomRepository(AddressRepository, connection.name);
  });

  beforeAll(async () => {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          firstName: 'Ozan',
          lastName: 'Turhan',
          email: 'm.ozanturhan@hotmail.com',
        },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(AddressTypeEntity)
      .values([
        {
          name: 'Home',
        },
      ])
      .execute();

    const city = await connection
      .createQueryBuilder()
      .insert()
      .into(CityEntity)
      .values([
        {
          name: 'Yalova',
        },
      ])
      .execute();

    const cityEntity = new CityEntity();
    cityEntity.id = city.raw.insertId;

    const town = await connection
      .createQueryBuilder()
      .insert()
      .into(TownEntity)
      .values([
        {
          city: cityEntity,
          name: 'Merkez',
        },
      ])
      .execute();

    const townEntity = new TownEntity();
    townEntity.id = town.raw.insertId;

    await connection
      .createQueryBuilder()
      .insert()
      .into(DistrictEntity)
      .values([
        {
          town: townEntity,
          name: 'Süleyman Bey Mah.',
        },
      ])
      .execute();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await app.close();
  });

  it('should be created', () => {
    expect(connection).toBeTruthy();
    expect(addressRepository).toBeTruthy();
  });

  it('should find address by user', async () => {
    const user = new UserEntity();
    user.id = 1;

    const city = new CityEntity();
    city.id = 1;

    const town = new TownEntity();
    town.id = 1;

    const district = new DistrictEntity();
    district.id = 1;

    const type = new AddressTypeEntity();
    type.id = 1;

    const addressEntity = new AddressEntity();
    addressEntity.user = user;
    addressEntity.city = city;
    addressEntity.town = city;
    addressEntity.district = district;
    addressEntity.title = 'My Litle Home';
    addressEntity.type = type;
    addressEntity.detail = 'Address Detail';
    addressEntity.directions = 'Address Directions';
    addressEntity.defaultPhone = '00000000000';

    await addressRepository.save(addressEntity);
    const expectedResult = [
      {
        city: {
          code: 0,
          id: 1,
          name: 'Yalova',
        },
        defaultPhone: '00000000000',
        detail: 'Address Detail',
        directions: 'Address Directions',
        district: {
          id: 1,
          name: 'Süleyman Bey Mah.',
        },
        id: 1,
        secondPhone: null,
        title: 'My Litle Home',
        town: {
          id: 1,
          name: 'Merkez',
        },
      },
    ];

    const addresses = await addressRepository.findByUser((user as unknown) as User);

    expect(addresses).toEqual(expectedResult);
  });
});
