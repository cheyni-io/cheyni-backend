import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { MailService } from '../../components/commons/modules/mail/mail.service';
import { UserEntity } from '../../entities/user.entity';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private mailService: MailService,
  ) {}

  async create(createUserDto: CreateUserDTO) {
    // const userExists = await this.userRepository.findUserByEmail(
    //   createUserDto.email,
    // );
    // if (userExists) {
    //   throw new BadRequestException('User already exists');
    // }
    const newUser = new UserEntity({ ...createUserDto });
    return await this.userRepository.saveUser(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
    }

    return this.userRepository
      .updateUser(id, updateUserDto)
      .then(() => 'User updated successfullys')
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async findUserByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findUserByEmail(email);
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

  public async updateResetPassword(email: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const code: string = Math.random().toString(36).substring(2, 15);
    const newPassword = await bcrypt.hash(code, await bcrypt.genSalt());
    return await this.userRepository
      .updateUser(user.id, { password: newPassword })
      .then(async () => {
        await this.mailService.resetPassword(user.email, code);
        return 'Password updated successfully';
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  public async changePassword(id: string, password: string): Promise<string> {
    if (!(await this.userRepository.findUserById(id))) {
      throw new BadRequestException('User not found');
    }

    const newPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    return await this.userRepository
      .updateUser(id, { password: newPassword })
      .then(() => 'Password updated successfully')
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }
}
