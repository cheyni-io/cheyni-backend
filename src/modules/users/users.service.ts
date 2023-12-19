import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDTO) {
    const newUser = new UserEntity({ ...createUserDto });

    return await this.userRepository.saveUser(newUser);
  }

  async findOne(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findUserByEmail(email);
  }
}
