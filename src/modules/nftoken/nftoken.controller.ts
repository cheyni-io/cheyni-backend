import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { NftokenService } from './nftoken.service';
import { CreateNftokenDto } from './dto/create-nftoken.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDTO } from 'src/components/commons/response.dto';
import { UpdateNftokenDto } from './dto/update-nftoken.dto';
// import { NFTokenDTO } from './dto/nftoken.dto';
// import { UpdateNftokenDto } from './dto/update-nftoken.dto';

@Controller('/nftoken')
@ApiTags('nftoken')
export class NftokenController {
  constructor(private readonly nftokenService: NftokenService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new NFToken' })
  @ApiBody({ type: CreateNftokenDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ResponseDTO,
    description: 'The NFToken has been successfully createds.',
  })
  async create(
    @Body() createNftokenDto: CreateNftokenDto,
  ): Promise<ResponseDTO> {
    return new ResponseDTO({
      message: 'The NFToken has been successfully created.',
      data: await this.nftokenService.create(createNftokenDto),
    });
  }

  @Get()
  @ApiOperation({ summary: 'Get all NFTokens' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ResponseDTO,
    description: 'Get all NFToken',
  })
  async findAll() {
    return new ResponseDTO({
      message: 'Get all NFToken',
      data: this.nftokenService.findAll(),
    });
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
