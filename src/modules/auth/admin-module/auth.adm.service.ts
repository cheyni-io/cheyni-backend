import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';
import * as bcrypt from 'bcrypt';

import { AdminUserService } from '../../adminUser/adminUser.service';

import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';
import { AdminPayloadDTO } from '../dtos/admin-payload.dto';
import { AdminEntity } from '../../../entities/admin.entity';

@Injectable()
export class AuthAdmService {
  constructor(
    private jwtService: JwtService,
    private adminUserService: AdminUserService,
  ) {}

  async adminUserSignIn(
    authCredentialsDto: AuthCredentialsDTO,
  ): Promise<{ access_token: string }> {
    const { email, password } = authCredentialsDto;
    const user: AdminEntity =
      await this.adminUserService.findByUsernameWithPassword(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = this.generateUserPayload(user);
      const access_token: string = this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException(
        'Email e/ou senha inválidas. Por favor, verifique os dados informados.',
      );
    }
  }

  async forgotPassword(email: string): Promise<string> {
    return await this.adminUserService.resetPassword(email);
  }

  async refreshToken(reqToken: string): Promise<{ access_token: string }> {
    if (!reqToken) {
      throw new BadRequestException(
        'Token não encontrado. Por favor, informe um token válido.',
      );
    }

    const token = reqToken.replace('Bearer ', '');
    const payload: any = jwtDecode(token);
    const user: AdminEntity = await this.adminUserService.findById(payload.id);
    let access_token: string;

    if (user) {
      access_token = this.jwtService.sign(this.generateUserPayload(user));
    } else {
      throw new UnauthorizedException(
        'Token inconsistente. Por favor, realize o login novamente.',
      );
    }

    return { access_token };
  }

  private generateUserPayload(user: AdminEntity) {
    const payload: AdminPayloadDTO = {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    };
    return payload;
  }
}
