import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { NftokenService } from './nftoken.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseDTO } from 'src/components/commons/response.dto';
import { UpdateNftokenDto } from './dto/update-nftoken.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';
// import { NFTokenDTO } from './dto/nftoken.dto';
// import { UpdateNftokenDto } from './dto/update-nftoken.dto';

@Controller('/nftoken')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('nftoken')
export class NftokenController {
  constructor(private readonly nftokenService: NftokenService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Create a new NFToken' })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'tokenImage', maxCount: 1 }]))
  // @ApiBody({ type: CreateNftokenDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseDTO,
    description: 'The NFToken has been successfully created.',
  })
  async create(
    @UploadedFiles() files,
    @Body('name') name: string,
    @Body('token') token: string,
    @Body('hash') hash: string,
  ) {
    await this.nftokenService.create(
      files.tokenImage[0].originalname,
      files.tokenImage[0].buffer,
      name,
      token,
      hash,
    );
    return {
      message: 'The NFToken has been successfully created.',
    };
  }

  @Get()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Get all NFTokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDTO,
    description: 'Get all NFToken',
  })
  async findAll() {
    return this.nftokenService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a NFToken by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDTO,
    description: 'Get a NFToken by id',
  })
  findOne(@Param('id') id: string) {
    return this.nftokenService.findOne(id);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Update a NFToken by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateNftokenDto,
    description: 'Update a NFToken by id',
  })
  update(@Param('id') id: string, @Body() updateNftokenDto: UpdateNftokenDto) {
    return this.nftokenService.update(id, updateNftokenDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Delete a NFToken by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDTO,
    description: 'Delete a NFToken by id',
  })
  remove(@Param('id') id: string) {
    return this.nftokenService.remove(id);
  }
}
