import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthAdmService } from './auth.adm.service';

import { ResponseDTO } from '../../../components/commons/swagger/dto/response.dto';
import { AuthCredentialsDTO } from '../dtos/auth-credentials.dto';

@Controller('/adm/auth')
@ApiTags('Autenticação')
export class AuthAdmController {
  constructor(private authAdmService: AuthAdmService) {}

  @Post('/signIn')
  @ApiBody({ type: AuthCredentialsDTO })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Object,
    description: 'Retorna um objeto access_token do tipo string.',
  })
  async adminSignIn(
    @Body() authCredentialsDto: AuthCredentialsDTO,
  ): Promise<{ access_token: string }> {
    return await this.authAdmService.adminUserSignIn(authCredentialsDto);
  }

  @Post('/forgotPassword')
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDTO,
    description:
      'Retorna um objeto data contendo um campo message do tipo string.',
  })
  async clinicForgotPassword(
    @Query('email') email: string,
  ): Promise<ResponseDTO> {
    return new ResponseDTO({
      message: await this.authAdmService.forgotPassword(email),
    });
  }

  @Get('/refreshToken')
  async refreshToken(@Request() req: Request): Promise<any> {
    return await this.authAdmService.refreshToken(req.headers['authorization']);
  }
}
