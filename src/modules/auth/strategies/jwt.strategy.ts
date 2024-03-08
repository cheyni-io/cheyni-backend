import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from '../constants/jwt.constants';

import { AdminEntity } from '../../../entities/admin.entity';
import { AdminUserService } from '../../adminUser/adminUser.service';

import { UserEntity } from '../../../entities/user.entity';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private adminService: AdminUserService,
    private userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    let admin: AdminEntity | UserEntity;

    if (payload.profile === 'ADMIN') {
      admin = await this.adminService.findById(payload.id);
    } else if (payload.profile === 'CLINICA') {
      admin = await this.userService.findUserById(payload.id);
    } else {
      throw new UnauthorizedException(
        'Dados de acesso inválidos. Por favor, verifique os dados informados.',
      );
    }

    return admin;
  }
}
