import { PartialType } from '@nestjs/swagger';
import { CreateUploadDTO } from './upload-video.dto';

export class UpdateVideoDto extends PartialType(CreateUploadDTO) {}
