import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { GenreEntity } from 'src/entities/genres.entity';
// import { CreateGenreDTO } from './dto/create-genre.dto';

@Injectable({ scope: Scope.REQUEST })
export class GenresRepository extends Repository<GenreEntity> {
  constructor(
    @Inject('CONNECTION')
    private readonly genreDataSource: DataSource,
  ) {
    super(GenreEntity, genreDataSource.createEntityManager());
  }

  async saveGenre(genre: GenreEntity) {
    return await this.save(this.create(genre));
  }

  async findGenreById(id: string) {
    return await this.findOne({
      where: { id },
      select: ['id', 'name'],
    });
  }

  async findAllGenres() {
    return await this.find();
  }
}
