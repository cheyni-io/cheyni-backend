import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadRepository } from './upload.repository';

@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadRepository],
})
export class UploadModule {}
