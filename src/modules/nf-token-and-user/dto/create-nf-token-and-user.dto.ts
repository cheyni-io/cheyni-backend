import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateNFTokenAndUserDto {
  // @ApiProperty({ type: String, description: 'userId' })
  // @IsNotEmpty({ message: 'userId is required' })
  // user: string;

  @ApiProperty({ type: String, description: 'nfTokenId' })
  @IsNotEmpty({ message: 'NFToken is required' })
  nftoken: string;

  // @ApiProperty({ type: String, description: 'uploadId' })
  // @IsNotEmpty({ message: 'Upload is required' })
  // upload: string;
}
