import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';

import { UploadEntity } from 'src/entities/upload.entity';

export class UploadDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty()
  @Expose()
  duration: string;

  @ApiProperty()
  @Expose()
  genre: string;

  @ApiProperty()
  @Expose()
  thumbnail: string;

  @ApiProperty()
  @Expose()
  createdAt: Date;

  @ApiProperty()
  @Expose()
  updatedAt: Date;

  static toDto(upload: UploadEntity): UploadDTO {
    return plainToClass(UploadDTO, upload, { excludeExtraneousValues: true });
  }
}

export class UploadListDto {
  @ApiProperty({ type: [UploadDTO] })
  @Expose()
  uploads: UploadDTO[];

  static toDto(uploads: UploadEntity[]): UploadListDto {
    return plainToClass(
      UploadListDto,
      { uploads },
      { excludeExtraneousValues: true },
    );
  }
}
