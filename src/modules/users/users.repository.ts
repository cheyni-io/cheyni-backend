import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends Repository<UserEntity> {
  constructor(
    @Inject('CONNECTION')
    private readonly userDataSource: DataSource,
  ) {
    super(UserEntity, userDataSource.createEntityManager());
  }

  async saveUser(user: UserEntity) {
    return await this.save(this.create(user));
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.update(id, user);
  }

  async deleteUser(id: string) {
    return await this.delete(id);
  }

  async findUserByEmail(email: string) {
    return await this.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'createdAt', 'updatedAt'],
    });
  }
}
