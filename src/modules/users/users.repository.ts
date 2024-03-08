import { Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository as TypeOrmRepository } from 'typeorm';

import { UserEntity } from '../../entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable({ scope: Scope.REQUEST })
export class UsersRepository extends TypeOrmRepository<UserEntity> {
  constructor(private readonly userDataSource: DataSource) {
    super(UserEntity, userDataSource.createEntityManager());
  }

  async saveUser(user: UserEntity) {
    return await this.save(user);
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.update(id, user);
  }

  async deleteUser(id: string) {
    return await this.delete(id);
  }

  async findUserById(id: string) {
    return await this.findOne({
      relations: ['nfTokenAndUser', 'nfTokenAndUser.nftoken'],
      where: { id },
      select: [
        'id',
        'name',
        'email',
        'avatar',
        'birthDate',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findUserByEmail(email: string) {
    return await this.findOne({
      where: { email },
      select: [
        'id',
        'name',
        'email',
        'avatar',
        'birthDate',
        'password',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findByEmailAndResetPasswordToken(
    email: string,
    resetPasswordToken: string,
  ) {
    return await this.findOne({
      where: { email, resetPasswordToken },
      select: ['id', 'name', 'email', 'resetPasswordToken'],
    }).catch((error) => {
      throw new Error(error);
    });
  }
}
