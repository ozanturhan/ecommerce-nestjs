import { EntityRepository, Repository } from 'typeorm';
import { TownEntity } from '../entities';

@EntityRepository(TownEntity)
export class TownRepository extends Repository<TownEntity> {}
