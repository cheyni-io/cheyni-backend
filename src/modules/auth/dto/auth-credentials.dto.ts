import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDTO {
  @ApiProperty({ type: String, description: 'email', required: true })
  email: string;

  @ApiProperty({ type: String, description: 'password', required: true })
  password: string;
}
