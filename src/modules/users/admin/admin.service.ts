import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';

import { AdminEntity } from 'src/entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(private adminRepository: AdminRepository) {}

  // async create(userDto: CreateUserDTO): Promise<UserEntity> {
  //   if (userDto.password.length < 6) {
  //     throw new BadRequestException('A senha precisa ter no mínimo 6 digitos.');
  //   }
  //   const user = this.userRepository.create(userDto);
  //   user.profile = ProfileEnum.ADMINISTRADOR;

  //   return await this.userRepository.save(user).catch((e) => {
  //     throw new InternalServerErrorException(
  //       'Ocorreu um erro ao criar o usuário. Por favor, tente novamente ou aguarde alguns minutos.',
  //       e,
  //     );
  //   });
  // }

  async findById(userId: string): Promise<AdminEntity> {
    return await this.adminRepository.findById(userId);
  }

  async findByLoggedUser(id: string): Promise<AdminEntity> {
    return await this.adminRepository.findById(id);
  }

  public async findByUsernameWithPassword(
    username: string,
  ): Promise<AdminEntity> {
    return await this.adminRepository.findByUsernameWithPassword(username);
  }
}
