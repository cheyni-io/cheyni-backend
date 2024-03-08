import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';
import { UserEntity } from '../../../entities/user.entity';

export class UserDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  email: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  static toDto(user: UserEntity): UserDTO {
    return plainToClass(UserDTO, user, { excludeExtraneousValues: true });
  }
}

export class UserListDto {
  @ApiProperty({ type: [UserDTO] })
  @Expose()
  users: UserDTO[];

  static toDto(users: UserEntity[]): UserListDto {
    return plainToClass(
      UserListDto,
      { users },
      { excludeExtraneousValues: true },
    );
  }
}
