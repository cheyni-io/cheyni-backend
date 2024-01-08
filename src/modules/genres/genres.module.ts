import { Module } from '@nestjs/common';
import { GenresService } from './genres.service';
import { GenresController } from './genres.controller';
import { GenresRepository } from './genres.repository';

@Module({
  providers: [GenresService, GenresRepository],
  controllers: [GenresController],
  exports: [GenresService, GenresRepository],
})
export class GenresModule {}
