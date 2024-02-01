import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';
import { UsersRepository } from '../users/users.repository';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, UsersRepository],
})
export class UploadModule {}
