import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Expose } from 'class-transformer';

import { GenreEntity } from 'src/entities/genres.entity';

export class GenreDTO {
  @ApiProperty()
  @Expose()
  id: string;

  @ApiProperty()
  @Expose()
  name: string;

  static toDto(genre: GenreEntity): GenreDTO {
    return plainToClass(GenreDTO, genre, { excludeExtraneousValues: true });
  }
}

export class GenreListDto {
  @ApiProperty({ type: [GenreDTO] })
  @Expose()
  genres: GenreDTO[];

  static toDto(genres: GenreEntity[]): GenreListDto {
    return plainToClass(
      GenreListDto,
      { genres },
      { excludeExtraneousValues: true },
    );
  }
}
