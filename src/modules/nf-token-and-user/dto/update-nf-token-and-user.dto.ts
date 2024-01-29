import { PartialType } from '@nestjs/swagger';
import { CreateNFTokenAndUserDto } from './create-nf-token-and-user.dto';

export class UpdateNfTokenAndUserDto extends PartialType(
  CreateNFTokenAndUserDto,
) {}
