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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('/upload')
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Uploads a file' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'image', maxCount: 1 },
      { name: 'mobileThumbnail', maxCount: 1 },
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
      files.mobileThumbnail[0].originalname,
      files.mobileThumbnail[0].buffer,
    );
    return {
      message: 'Files uploaded successfully',
    };
  }

  @Patch(':id')
  @Roles('ADMIN')
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
    if (files && files.file && files.file[0] && files.image && files.image[0]) {
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
    } else {
      // Update without new file and thumbnail
      await this.uploadService.updateVideoWithoutFile(
        id,
        title,
        description,
        duration,
        genre,
        nftoken,
      );
    }

    return {
      message: 'Video updated successfully',
    };
  }

  @Delete(':id')
  @Roles('ADMIN')
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

  @Get('/users')
  @Roles('ADMIN')
  @ApiOperation({ summary: 'Retorna todos os usuários' })
  async getAllUsers() {
    return await this.uploadService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna um vídeo' })
  async getVideoById(@Param('id') id: string) {
    return await this.uploadService.getVideoById(id);
  }
}
