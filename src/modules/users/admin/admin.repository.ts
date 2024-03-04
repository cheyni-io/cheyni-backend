import { AdminEntity } from 'src/entities/admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  public async findById(id: string): Promise<AdminEntity> {
    return this.findOne({
      where: {
        id: id,
      },
    }).catch((e) => {
      throw new Error(e);
    });
  }

  public async findAll(
    take: number,
    skip: number,
  ): Promise<[AdminEntity[], number]> {
    return this.findAndCount({
      take,
      skip,
      order: {
        email: 'ASC',
      },
    }).catch((e) => {
      throw new Error(e);
    });
  }

  public async existsById(id: string): Promise<boolean> {
    return this.findOne({
      where: {
        id,
      },
    })
      .then(async (result) => {
        return result.id ? true : false;
      })
      .catch((e) => {
        throw new Error(e);
      });
  }

  public async findByUsernameWithPassword(email: string): Promise<AdminEntity> {
    return this.findOne({
      where: {
        email: email,
      },
      select: ['id', 'email', 'password', 'profile'],
    }).catch((e) => {
      throw new Error(e);
    });
  }
}
