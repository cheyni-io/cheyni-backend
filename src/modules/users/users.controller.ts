import {
  Controller,
  Body,
  UseGuards,
  Get,
  HttpStatus,
  Delete,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserDTO } from './dto/user-responses.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('/auth')
@ApiTags('Autenticação')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Retorna os dados do usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User returned successfully',
    type: UserDTO,
  })
  async getUser(@GetUser() user: UserDTO) {
    return await this.usersService.findUserById(user.id);
  }

  @Put()
  @ApiOperation({ summary: 'Atualiza os dados usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: UserDTO,
  })
  async updateUser(
    @GetUser() user: UserDTO,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(user.id, updateUserDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Deleta o usuário' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    type: UserDTO,
  })
  async deleteUser(@GetUser() user: UserDTO) {
    return await this.usersService.delete(user.id);
  }
}
