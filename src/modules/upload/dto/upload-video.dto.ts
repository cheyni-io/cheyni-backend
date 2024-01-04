import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUploadDTO {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @ApiProperty({ type: String, description: 'title' })
  @IsNotEmpty({ message: 'title is required' })
  title: string;

  @ApiProperty({ type: String, description: 'description' })
  @IsNotEmpty({ message: 'description is required' })
  description: string;

  @ApiProperty({ type: String, description: 'thumbnail' })
  thumbnail: string;

  @ApiProperty({ type: String, description: 'category' })
  category: string;
}
