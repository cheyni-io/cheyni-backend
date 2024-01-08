import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UploadEntity } from 'src/entities/upload.entity';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable({ scope: Scope.REQUEST })
export class UploadRepository extends Repository<UploadEntity> {
  constructor(
    @Inject('CONNECTION')
    private readonly uploadDataSource: DataSource,
  ) {
    super(UploadEntity, uploadDataSource.createEntityManager());
  }

  async saveVideo(video: UploadEntity) {
    return await this.save(this.create(video));
  }

  async updateVideo(id: string, video: UpdateVideoDto) {
    return await this.update(id, video);
  }

  async deleteVideo(id: string) {
    return await this.delete(id);
  }

  async findVideoById(id: string) {
    console.log(id);
    return await this.findOne({
      where: {
        id: id,
      },
      select: [
        'id',
        'name',
        'title',
        'duration',
        'thumbnail',
        'genre',
        'description',
        'createdAt',
        'updatedAt',
      ],
    });
  }

  async findVideoByName(name: string) {
    return await this.findOne({
      where: { name },
      select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    });
  }

  async findVideoByGenre(genre: string) {
    return await this.findOne({
      where: { genre },
      select: ['id', 'name', 'description', 'createdAt', 'updatedAt'],
    });
  }
}
