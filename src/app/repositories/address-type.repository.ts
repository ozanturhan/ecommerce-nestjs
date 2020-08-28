import { EntityRepository, Repository } from 'typeorm';
import { AddressTypeEntity } from '../entities';

@EntityRepository(AddressTypeEntity)
export class AddressTypeRepository extends Repository<AddressTypeEntity> {}
