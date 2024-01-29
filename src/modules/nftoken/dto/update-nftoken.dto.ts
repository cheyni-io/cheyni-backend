import { PartialType } from '@nestjs/swagger';
import { CreateNftokenDto } from './create-nftoken.dto';

export class UpdateNftokenDto extends PartialType(CreateNftokenDto) {}
