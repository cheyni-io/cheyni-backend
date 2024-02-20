import { Body, Controller, Post, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from '../users/dto/create-user.dto';
import { signInDTO } from './dto/signIn.dto';

@Controller('/auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signUp')
  @ApiOperation({ summary: 'Realiza o cadastro do usuário' })
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
}
