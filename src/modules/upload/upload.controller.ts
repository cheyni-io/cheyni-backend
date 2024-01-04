import {
  Controller,
  Get,
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
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    await this.uploadService.upload(file.originalname, file.buffer);
    return {
      message: 'File uploaded successfully',
    };
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os vídeos' })
  async getAllVideos() {
    return await this.uploadService.getAllVideos();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Retorna um vídeo' })
  async getVideoById(id: string) {
    return await this.uploadService.getVideoById(id);
  }
}
