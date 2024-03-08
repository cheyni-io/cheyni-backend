import { plainToClass } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { NFTokenEntity } from '../../../entities/nftoken.entity';

export class NFTokenDTO {
  @ApiProperty({ type: String, description: 'token' })
  token: string;

  @ApiProperty({ type: String, description: 'name' })
  name: string;

  @ApiProperty({ type: String, description: 'hash' })
  hash: string;

  @ApiProperty({ type: String, description: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ type: String, description: 'updatedAt' })
  updatedAt: Date;

  static toDTO(nftoken: NFTokenEntity): NFTokenDTO {
    return plainToClass(NFTokenDTO, nftoken);
  }

  static toDTOList(nftoken: NFTokenEntity[]): NFTokenDTO[] {
    return plainToClass(NFTokenDTO, nftoken);
  }
}
