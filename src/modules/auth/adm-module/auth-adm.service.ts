import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';
import * as bcrypt from 'bcrypt';

import { AdminService } from 'src/modules/users/admin/admin.service';

import { AdminPayloadDTO } from '../dto/admin-payload.dto';

import { AdminEntity } from 'src/entities/admin.entity';
import { AuthCredentialsDTO } from '../dto/auth-credentials.dto';

@Injectable()
export class AuthAdmService {
  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
  ) {}

  async userSignIn(
    authCredentialsDto: AuthCredentialsDTO,
  ): Promise<{ access_token: string }> {
    const { email, password } = authCredentialsDto;
    const admin: AdminEntity =
      await this.adminService.findByUsernameWithPassword(email);

    if (admin && (await bcrypt.compare(password, admin.password))) {
      const payload = this.generateUserPayload(admin);
      const access_token: string = this.jwtService.sign(payload);
      return { access_token };
    } else {
      throw new UnauthorizedException(
        'Email e/ou senha inválidas. Por favor, verifique os dados informados.',
      );
    }
  }

  async refreshToken(reqToken: string): Promise<{ access_token: string }> {
    if (!reqToken) {
      throw new BadRequestException(
        'Token não encontrado. Por favor, informe um token válido.',
      );
    }

    const token = reqToken.replace('Bearer ', '');
    const payload: any = jwtDecode(token);
    const admin: AdminEntity = await this.adminService.findById(payload.id);
    let access_token: string;

    if (admin) {
      access_token = this.jwtService.sign(this.generateUserPayload(admin));
    } else {
      throw new UnauthorizedException(
        'Token inconsistente. Por favor, realize o login novamente.',
      );
    }

    return { access_token };
  }

  private generateUserPayload(admin: AdminEntity) {
    const payload: AdminPayloadDTO = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      profile: admin.profile,
    };
    return payload;
  }
}
