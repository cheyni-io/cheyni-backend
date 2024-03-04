import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ type: String, description: 'name' })
  @IsNotEmpty({ message: 'Nome não pode ser vazio.' })
  name: string;

  @ApiProperty({ type: String, description: 'username' })
  @IsNotEmpty({ message: 'Usuário não pode ser vazio.' })
  username: string;

  @ApiProperty({ type: String, description: 'password' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia.' })
  password: string;
}
