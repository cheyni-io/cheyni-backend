import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadRepository } from './upload.repository';
import { UploadEntity } from 'src/entities/upload.entity';
import { CreateUploadDTO } from './dto/upload-video.dto';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadRepository: UploadRepository,
  ) {}

  async upload(
    fileName: string,
    file: Buffer,
    thumbnailName: string,
    thumbnail: Buffer,
    title: string,
    description: string,
    duration: string,
    genre: string,
  ) {
    const newUpload = new UploadEntity({
      ...new CreateUploadDTO(),
      name: fileName,
      thumbnail: thumbnailName,
      description: description,
      title: title,
      duration: duration,
      genre: genre,
    });
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'cheyni',
        Key: fileName,
        Body: file,
      }),
    );

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'cheyni',
        Key: thumbnailName,
        Body: thumbnail,
      }),
    );
    return await this.uploadRepository.saveVideo(newUpload);
  }

  async getAllVideos() {
    return await this.uploadRepository.find();
  }

  async getVideoById(id: string) {
    return await this.uploadRepository.findVideoById(id);
  }
}
