import { plainToClass } from 'class-transformer';
import { AdminEntity } from 'src/entities/admin.entity';

export class AdminUserDTO {
  id: string;
  username: string;
  profile: string;
  createdAt: Date;
  updatedAt: Date;

  static toDto(admin: AdminEntity): AdminUserDTO {
    return plainToClass(AdminUserDTO, admin);
  }

  static toDtoList(admin: AdminEntity[]): AdminUserDTO[] {
    return plainToClass(AdminUserDTO, admin);
  }
}
