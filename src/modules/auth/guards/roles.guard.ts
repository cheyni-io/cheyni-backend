import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.slice(7);
    const user: any = jwtDecode(token);

    const access = roles.some((role) => role.match(user.profile));

    if (access) {
      return true;
    } else {
      throw new UnauthorizedException(
        'Você não possui permissão para acessar esse recurso.',
      );
    }
  }
}
