import { PartialType } from '@nestjs/mapped-types';
import { CreateGenreDTO } from './create-genre.dto';

export class UpdateGenreDto extends PartialType(CreateGenreDTO) {}
