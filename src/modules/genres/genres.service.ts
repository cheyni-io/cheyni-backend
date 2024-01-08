import { BadRequestException, Injectable } from '@nestjs/common';
import { GenreEntity } from 'src/entities/genres.entity';
import { CreateGenreDTO } from './dto/create-genre.dto';
import { GenresRepository } from './genres.repository';

@Injectable()
export class GenresService {
  constructor(private readonly genreRepository: GenresRepository) {}

  async create(createGenreDto: CreateGenreDTO) {
    const newGenre = new GenreEntity({ ...createGenreDto });

    return await this.genreRepository.saveGenre(newGenre);
  }

  // async update(id: string, updateGenreDto: UpdateGenreDto) {
  //   return this.genreRepository
  //     .updateGenre(id, updateGenreDto)
  //     .then(() => 'Genre updated successfullys')
  //     .catch((error) => {
  //       throw new BadRequestException(error);
  //     });
  // }

  // async delete(id: string) {
  //   if (!id) {
  //     throw new BadRequestException('Id not found');
  //   } else {
  //     return await this.genreRepository
  //       .deleteGenre(id)
  //       .then(() => {
  //         return 'Genre deleted successfully';
  //       })
  //       .catch((error) => {
  //         throw new BadRequestException(error);
  //       });
  //   }
  // }

  async findGenreById(id: string): Promise<GenreEntity | undefined> {
    return await this.genreRepository
      .findGenreById(id)
      .then((genre) => {
        if (!genre) {
          throw new BadRequestException('Genre not found');
        }
        return genre;
      })
      .catch((error) => {
        throw new BadRequestException(error);
      });
  }

  async findAllGenres(): Promise<GenreEntity[]> {
    return await this.genreRepository.findAllGenres();
  }
}
