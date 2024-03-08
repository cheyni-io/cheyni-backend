import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';
import { UsersRepository } from '../users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadEntity } from '../../entities/upload.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UploadEntity])],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, UsersRepository],
  exports: [UploadService, TypeOrmModule],
})
export class UploadModule {}
