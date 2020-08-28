import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entities';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async findByEmail(email: string): Promise<UserEntity> {
    return this.createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }
}
