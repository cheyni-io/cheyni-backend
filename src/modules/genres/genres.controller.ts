import { Controller, Body, Get, Post } from '@nestjs/common';
import { GenresService } from './genres.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateGenreDTO } from './dto/create-genre.dto';

@Controller('genres')
@ApiTags('Genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo gênero' })
  async create(@Body() createGenreDto: CreateGenreDTO) {
    return await this.genresService.create(createGenreDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os gêneros' })
  async findAll() {
    return await this.genresService.findAllGenres();
  }
}
