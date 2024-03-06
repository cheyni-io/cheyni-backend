import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UploadRepository } from './upload.repository';
import { UploadEntity } from 'src/entities/upload.entity';
import { CreateUploadDTO } from './dto/upload-video.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private readonly configService: ConfigService,
    private readonly uploadRepository: UploadRepository,
    private readonly usersRepository: UsersRepository,
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
    nftoken: string,
    mobileThumbnailName?: string,
    mobileThumbnail?: Buffer,
  ) {
    const newUpload = new UploadEntity({
      ...new CreateUploadDTO(),
      name: fileName,
      thumbnail: thumbnailName,
      mobileThumbnail: mobileThumbnailName,
      description: description,
      title: title,
      duration: duration,
      genre: genre,
      nftoken: nftoken,
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

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: 'cheyni',
        Key: mobileThumbnailName,
        Body: mobileThumbnail,
      }),
    );
    return await this.uploadRepository.saveVideo(newUpload);
  }

  async updateVideo(
    id: string,
    fileName?: string,
    file?: Buffer,
    thumbnailName?: string,
    thumbnail?: Buffer,
    title?: string,
    description?: string,
    duration?: string,
    genre?: string,
    nftoken?: string,
  ) {
    const video = await this.uploadRepository.findVideoById(id);
    if (fileName) {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'cheyni',
          Key: fileName,
          Body: file,
        }),
      );
    } else {
      fileName = video.name;
    }
    if (thumbnailName) {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'cheyni',
          Key: thumbnailName,
          Body: thumbnail,
        }),
      );
    } else {
      thumbnailName = video.thumbnail;
    }
    const updatedVideo = new UploadEntity({
      ...video,
      name: fileName,
      thumbnail: thumbnailName,
      description: description || video.description,
      title: title || video.title,
      duration: duration || video.duration,
      genre: genre || video.genre,
      nftoken: nftoken || video.nftoken,
    });
    return await this.uploadRepository.updateVideo(id, updatedVideo);
  }

  //Update video without file, keeping the same file
  async updateVideoWithoutFile(
    id: string,
    title: string,
    description: string,
    duration: string,
    genre: string,
    nftoken: string,
  ) {
    const video = await this.uploadRepository.findVideoById(id);
    const updatedVideo = new UploadEntity({
      ...video,
      description: description || video.description,
      title: title || video.title,
      duration: duration || video.duration,
      genre: genre || video.genre,
      nftoken: nftoken || video.nftoken,
    });
    return await this.uploadRepository.updateVideo(id, updatedVideo);
  }

  async getAllUsers() {
    return await this.usersRepository.find();
  }

  async deleteVideo(id: string) {
    return await this.uploadRepository.deleteVideo(id);
  }

  async getAllVideos() {
    return await this.uploadRepository.find();
  }

  async getVideoById(id: string) {
    return await this.uploadRepository.findVideoById(id);
  }

  async findByTitle(title: string) {
    return await this.uploadRepository.findVideoByTitle(title);
  }
}
