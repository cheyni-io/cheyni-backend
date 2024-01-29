import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNftokenDto {
  @ApiProperty({ type: String, description: 'token' })
  @IsNotEmpty({ message: 'token is required' })
  token: string;

  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'name is required' })
  name: string;
}
