import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Uploads a file' })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('duration') duration: string,
    @Body('genre') genre: string,
    @Body('thumbnail') thumbnail: string,
  ) {
    await this.uploadService.upload(
      file.originalname,
      file.buffer,
      title,
      description,
      duration,
      genre,
      thumbnail,
    );
    return {
      message: 'File uploaded successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os vídeos' })
  async getAllVideos() {
    return await this.uploadService.getAllVideos();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um vídeo' })
  async getVideoById(@Param('id') id: string) {
    return await this.uploadService.getVideoById(id);
  }
}
