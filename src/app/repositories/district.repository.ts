import { EntityRepository, Repository } from 'typeorm';
import { DistrictEntity } from '../entities';

@EntityRepository(DistrictEntity)
export class DistrictRepository extends Repository<DistrictEntity> {}
