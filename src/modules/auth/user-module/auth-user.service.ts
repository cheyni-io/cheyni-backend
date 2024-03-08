import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

import { UsersService } from '../../users/users.service';

import { UserEntity } from '../../../entities/user.entity';

import { UserPayloadDTO } from '../dtos/user-payload.dto';

import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { signInDTO } from '../dtos/signIn.dto';

@Injectable()
export class AuthUserService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async createUser(user: CreateUserDTO) {
    //Verificar se já existe um usuário com o mesmo email
    const userExists = await this.userService.findUserByEmail(user.email);

    if (userExists) {
      throw new BadRequestException('User already exists');
    }
    const newUser = new UserEntity({ ...user });

    return await this.userService
      .create(newUser)
      .then(() => {
        return 'Usuário criado com sucesso';
      })
      .catch((error) => {
        throw new UnauthorizedException(error);
      });
  }

  async signIn(signIn: signInDTO) {
    const { email, password } = signIn;
    const user = await this.userService.findOne(email);
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = this.generateUserPayload(user);
      const access_token: string = this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async forgotPassword(email: string) {
    return await this.userService.updateResetPassword(email);
  }

  private generateUserPayload(user: UserEntity) {
    const payload: UserPayloadDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return payload;
  }
}
