import { Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository as TypeOrmRepository } from 'typeorm';

import { AdminEntity } from '../../entities/admin.entity';

@Injectable({ scope: Scope.REQUEST })
export class AdminUserRepository extends TypeOrmRepository<AdminEntity> {
  constructor(private readonly adminUserDataSource: DataSource) {
    super(AdminEntity, adminUserDataSource.createEntityManager());
  }
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
        name: 'ASC',
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

  public async findByNameWithPassword(name: string): Promise<AdminEntity> {
    return this.findOne({
      where: {
        name: name,
      },
      select: ['id', 'name', 'password', 'profile'],
    }).catch((e) => {
      throw new Error(e);
    });
  }
}
