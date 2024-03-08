import { plainToClass } from 'class-transformer';
import { AdminEntity } from '../../../entities/admin.entity';

export class AdminUserDTO {
  id: string;
  username: string;
  profile: string;
  createdAt: Date;
  updatedAt: Date;

  static toDto(adminUser: AdminEntity): AdminUserDTO {
    return plainToClass(AdminUserDTO, adminUser);
  }

  static toDtoList(adminUser: AdminEntity[]): AdminUserDTO[] {
    return plainToClass(AdminUserDTO, adminUser);
  }
}
