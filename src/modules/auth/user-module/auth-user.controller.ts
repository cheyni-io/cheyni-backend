import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../../users/dto/create-user.dto';
import { signInDTO } from '../dtos/signIn.dto';
import { AuthUserService } from './auth-user.service';

@Controller('/auth')
@ApiTags('Autenticação')
export class AuthUserController {
  constructor(private authService: AuthUserService) {}

  @Post('/signUp')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: CreateUserDTO,
  })
  async createUser(@Body() dto: CreateUserDTO) {
    dto.avatar = String.fromCodePoint(
      0x1f600 + Math.floor(Math.random() * 100),
    );

    return this.authService.createUser(dto);
  }

  @Post('/signIn')
  @ApiOperation({ summary: 'Realiza o login do usuário' })
  @ApiBody({ type: signInDTO })
  async signIn(@Body() dto: signInDTO): Promise<{ access_token: string }> {
    return this.authService.signIn(dto);
  }

  @Post('/forgotPassword')
  @ApiOperation({ summary: 'Recupera a senha do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email enviado com sucesso',
  })
  async forgotPassword(@Body('email') email: string) {
    return this.authService.forgotPassword(email);
  }
}
