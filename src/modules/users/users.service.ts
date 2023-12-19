import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDTO) {
    const newUser = new UserEntity({ ...createUserDto });

    return await this.userRepository.saveUser(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository
      .updateUser(id, updateUserDto)
      .then(() => {
        return 'User updated successfully';
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async delete(id: string) {
    if (!id) {
      throw new BadRequestException('Id not found');
    } else {
      return await this.userRepository
        .deleteUser(id)
        .then(() => {
          return 'User deleted successfully';
        })
        .catch((error) => {
          throw new BadRequestException(error);
        });
    }
  }

  async findUserById(id: string): Promise<UserEntity | undefined> {
    return await this.userRepository
      .findUserById(id)
      .then((user) => {
        if (!user) {
          throw new BadRequestException('User not found');
        }
        return user;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findUserByEmail(email);
  }
}
