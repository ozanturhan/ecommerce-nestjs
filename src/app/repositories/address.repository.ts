import { EntityRepository, Repository } from 'typeorm';
import { AddressEntity } from '../entities';
import { User } from '../models';

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {
  async findByUser(user: User) {
    return this.createQueryBuilder('address')
      .innerJoinAndSelect('address.city', 'city')
      .innerJoinAndSelect('address.town', 'town')
      .innerJoinAndSelect('address.district', 'district')
      .where('userId = :userId', { userId: user.id })
      .getMany();
  }
}
