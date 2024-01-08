import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateGenreDTO {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;
}
