import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('/upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Uploads a file' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async uploadFile(
    @UploadedFiles() files,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('duration') duration: string,
    @Body('genre') genre: string,
    @Body('nftoken') nftoken: string,
  ) {
    await this.uploadService.upload(
      files.file[0].originalname,
      files.file[0].buffer,
      files.image[0].originalname,
      files.image[0].buffer,
      // thumbnailFile,
      title,
      description,
      duration,
      genre,
      nftoken,
    );
    return {
      message: 'Files uploaded successfully',
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um vídeo' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async updateVideo(
    @Param('id') id: string,
    @UploadedFiles(
      new ParseFilePipe({
        fileIsRequired: false,
      }),
    )
    files?,
    @Body('title') title?: string,
    @Body('description') description?: string,
    @Body('duration') duration?: string,
    @Body('genre') genre?: string,
    @Body('nftoken') nftoken?: string,
  ) {
    await this.uploadService.updateVideo(
      id,
      files.file[0].originalname,
      files.file[0].buffer,
      files.image[0].originalname,
      files.image[0].buffer,
      title,
      description,
      duration,
      genre,
      nftoken,
    );
    return {
      message: 'Video updated successfully',
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um vídeo' })
  async deleteVideo(@Param('id') id: string) {
    await this.uploadService.deleteVideo(id);
    return {
      message: 'Video deleted successfully',
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
