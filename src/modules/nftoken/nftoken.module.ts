import { Module } from '@nestjs/common';
import { NftokenService } from './nftoken.service';
import { NftokenController } from './nftoken.controller';
import { NftokenRepository } from './nftoken.repository';

@Module({
  controllers: [NftokenController],
  providers: [NftokenService, NftokenRepository],
  exports: [NftokenService, NftokenRepository],
})
export class NftokenModule {}
