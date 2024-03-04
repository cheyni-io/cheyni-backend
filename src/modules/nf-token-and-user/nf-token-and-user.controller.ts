import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { NfTokenAndUserService } from './nf-token-and-user.service';
import { CreateNFTokenAndUserDto } from './dto/create-nf-token-and-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserPayloadDTO } from '../auth/dto/user-payload.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('nf-token-and-user')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class NfTokenAndUserController {
  constructor(private readonly nfTokenAndUserService: NfTokenAndUserService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createNfTokenAndUserDto: CreateNFTokenAndUserDto,
    @GetUser() user: UserPayloadDTO,
  ) {
    const userId = user.id;

    //Chamar o userHasToken para verificar se o usuário já possui o token
    //Se já possuir, retornar um erro
    //Se não possuir, chamar o create
    const hasToken = await this.nfTokenAndUserService.userHasToken(
      userId,
      createNfTokenAndUserDto.nftoken,
    );

    if (hasToken) {
      throw new BadRequestException({
        message: 'Woops! You already have this token!',
      });
    }

    return this.nfTokenAndUserService.create(userId, createNfTokenAndUserDto);
  }

  @Get('/has-token/:id')
  @UseGuards(JwtAuthGuard)
  async userHasToken(
    @GetUser() user: UserPayloadDTO,
    @Param('id') nftokenId: string,
  ): Promise<boolean> {
    return await this.nfTokenAndUserService.userHasToken(user.id, nftokenId);
  }

  // @Get()
  // findAll() {
  //   return this.nfTokenAndUserService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.nfTokenAndUserService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateNfTokenAndUserDto: UpdateNfTokenAndUserDto,
  // ) {
  //   return this.nfTokenAndUserService.update(+id, updateNfTokenAndUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.nfTokenAndUserService.remove(+id);
  // }
}
