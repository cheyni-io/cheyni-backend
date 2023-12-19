import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { UserEntity } from 'src/entities/user.entity';
import { signInDTO } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { UserPayloadDTO } from './dto/user-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
    private readonly userRepository: UsersRepository,
  ) {}

  async createUser(user: CreateUserDTO) {
    const newUser = new UserEntity({ ...user });

    return await this.userRepository
      .saveUser(newUser)
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

  // async refreshToken(reqToken: string) {
  //   const token = reqToken.replace('Bearer ', '');
  //   const payload = this.jwtService.decode(token);
  //   const user: UserEntity = await this.userService.findById(payload['id']);
  //   let access_token: string;

  //   if (user) {
  //     access_token = this.jwtService.sign(this.generateUserPayload(user));
  //   } else {
  //     throw new BadRequestException('Invalid credentials');
  //   }

  //   return { access_token };
  // }

  private generateUserPayload(user: UserEntity) {
    const payload: UserPayloadDTO = {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return payload;
  }
}
