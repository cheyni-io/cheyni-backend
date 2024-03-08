import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { AdminUserRepository } from './adminUser.repository';

import { MailService } from '../../components/commons/modules/mail/mail.service';

import { AdminEntity } from '../../entities/admin.entity';

import { CreateUserDTO } from './dto/create-adminUser.dto';

import { ProfileEnum } from '../../components/enum/profile.enum';

@Injectable()
export class AdminUserService {
  constructor(
    // @InjectRepository(AdminUserRepository)
    private adminUserRepository: AdminUserRepository,
    private mailService: MailService,
  ) {}

  async create(userDto: CreateUserDTO): Promise<AdminEntity> {
    if (userDto.password.length < 6) {
      throw new BadRequestException('A senha precisa ter no mínimo 6 digitos.');
    }
    const user = this.adminUserRepository.create(userDto);
    user.profile = ProfileEnum.ADMIN;

    return await this.adminUserRepository.save(user).catch((e) => {
      throw new InternalServerErrorException(
        'Ocorreu um erro ao criar o usuário. Por favor, tente novamente ou aguarde alguns minutos.',
        e,
      );
    });
  }

  async updateName(id: string, newName: string): Promise<string> {
    if (!(await this.adminUserRepository.existsById(id))) {
      throw new BadRequestException(
        'Usuário não encontrado. Por favor, informe um código válido.',
      );
    }

    return await this.adminUserRepository
      .update(id, { name: newName })
      .then(async () => {
        return 'Senha atualizada com sucesso.';
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao atualizar a senha do usuário. Por favor, tente novamente ou aguarde alguns minutos.',
          e,
        );
      });
  }

  async updatePassword(id: string, newPassword: string): Promise<string> {
    if (!(await this.adminUserRepository.existsById(id))) {
      throw new BadRequestException(
        'Usuário não encontrado. Por favor, informe um código válido.',
      );
    }

    return await this.adminUserRepository
      .update(id, { password: bcrypt.hashSync(newPassword, 10) })
      .then(async () => {
        return 'Senha atualizada com sucesso.';
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao atualizar a senha do usuário. Por favor, tente novamente ou aguarde alguns minutos.',
          e,
        );
      });
  }

  public async resetPassword(email: string): Promise<string> {
    const user: AdminEntity =
      await this.adminUserRepository.findByNameWithPassword(email);
    if (!user) {
      throw new BadRequestException(
        'E-mail inválido. Por favor, informe um e-mail válido ou tente novamente em alguns minutos.',
      );
    }

    const code: string = Math.random().toString(36).slice(5);
    const newPassword = await bcrypt.hash(code, await bcrypt.genSalt());
    return await this.adminUserRepository
      .update(user.id, { password: newPassword })
      .then(async () => {
        await this.mailService.resetPassword(user.name, code);
        return 'Sua solicitação foi recebida com sucesso. Por favor, verifique seu email para prosseguir.';
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao solicitar alteração de senha. Por favor, tente novamente.',
          e,
        );
      });
  }

  async delete(id: string): Promise<string> {
    if (!(await this.adminUserRepository.findById(id))) {
      throw new BadRequestException(
        'Usuário não encontrado. Por favor, informe um código válido.',
      );
    }

    return await this.adminUserRepository
      .delete(id)
      .then(async () => {
        return 'Usuário excluído com sucesso.';
      })
      .catch((e) => {
        throw new InternalServerErrorException(
          'Ocorreu um erro ao excluir o usuário. Tente novamente mais tarde.',
          e,
        );
      });
  }

  async findById(userId: string): Promise<AdminEntity> {
    return await this.adminUserRepository.findById(userId);
  }

  async findByLoggedUser(id: string): Promise<AdminEntity> {
    return await this.adminUserRepository.findById(id);
  }

  public async findAll(
    page: number,
    size: number,
  ): Promise<[AdminEntity[], number]> {
    const skip = page <= 1 ? 0 : (page - 1) * size;
    const take = size;
    return await this.adminUserRepository.findAll(take, skip);
  }

  public async existentById(id: string): Promise<boolean> {
    return await this.adminUserRepository.existsById(id);
  }

  // métodos exclusivos para login :: começo
  public async findByUsernameWithPassword(
    username: string,
  ): Promise<AdminEntity> {
    return await this.adminUserRepository.findByNameWithPassword(username);
  }
  // métodos exclusivos para login :: fim
}
