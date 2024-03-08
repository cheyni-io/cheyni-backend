import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserPayloadDTO } from '../auth/dtos/user-payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateNFTokenAndUserDto } from './dto/create-nf-token-and-user.dto';
import { NfTokenAndUserService } from './nf-token-and-user.service';
// import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('nf-token-and-user')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
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
