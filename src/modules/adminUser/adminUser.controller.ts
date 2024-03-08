import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

import { GetUser } from '../auth/decorators/get-user.decorator';

import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

import { AdminUserService } from './adminUser.service';

import { AdminUserDTO } from './dto/adminUser.dto';
import { CreateUserDTO } from './dto/create-adminUser.dto';

import { AdminPayloadDTO } from '../auth/dtos/admin-payload.dto';

import { PaginatorResponseDTO } from '../../components/commons/swagger/dto/paginator-response.dto';
import { ResponseDTO } from '../../components/commons/swagger/dto/response.dto';

@Controller('/adm/user')
@ApiTags('Usuário')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminUserController {
  constructor(private adminUserService: AdminUserService) {}

  @Post()
  @Roles('ADMIN')
  @ApiBody({ type: CreateUserDTO })
  async create(@Body() adminUserDto: CreateUserDTO): Promise<AdminUserDTO> {
    const user = await this.adminUserService.create(adminUserDto);
    return AdminUserDTO.toDto(user);
  }

  @Delete()
  @Roles('ADMIN')
  @ApiQuery({ name: 'id', type: 'string', required: true })
  async delete(@Query('id') id: string): Promise<ResponseDTO> {
    return new ResponseDTO({
      message: await this.adminUserService.delete(id),
    });
  }

  @Put()
  @Roles('ADMIN')
  @ApiQuery({ name: 'name', type: 'string', required: true })
  async changeName(
    @GetUser() admin: AdminPayloadDTO,
    @Query('name') name: string,
  ): Promise<ResponseDTO> {
    return new ResponseDTO({
      message: await this.adminUserService.updateName(admin.id, name),
    });
  }

  @Put()
  @Roles('ADMIN')
  @ApiQuery({ name: 'password', type: 'string', required: true })
  async changePassword(
    @GetUser() user: AdminPayloadDTO,
    @Query('password') password: string,
  ): Promise<ResponseDTO> {
    return new ResponseDTO({
      message: await this.adminUserService.updatePassword(user.id, password),
    });
  }

  @Get('/logged')
  @Roles('ADMIN')
  async findByLoggedUser(@GetUser() userPayload: any): Promise<ResponseDTO> {
    const user = await this.adminUserService.findByLoggedUser(userPayload.id);
    return new ResponseDTO(AdminUserDTO.toDto(user));
  }

  @Get('/findById')
  @Roles('ADMIN')
  @ApiQuery({ name: 'id', type: 'string' })
  async findById(@Query('id') id: string): Promise<ResponseDTO> {
    const user = await this.adminUserService.findById(id);
    return new ResponseDTO(AdminUserDTO.toDto(user));
  }

  @Get('/findAll')
  @Roles('ADMIN')
  @ApiQuery({ name: 'page', type: 'number' })
  @ApiQuery({ name: 'items', type: 'number' })
  async findAll(
    @Query('page') page: number,
    @Query('items') items: number,
  ): Promise<PaginatorResponseDTO> {
    const response = new PaginatorResponseDTO(page, items);
    [response.data, response.total] = await this.adminUserService.findAll(
      page,
      items,
    );
    response.data = AdminUserDTO.toDtoList(response.data);
    return response;
  }
}
