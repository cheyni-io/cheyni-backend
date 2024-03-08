import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { NftokenService } from './nftoken.service';
import { NftokenController } from './nftoken.controller';
import { NftokenRepository } from './nftoken.repository';

@Module({
  imports: [TypeOrmModule.forFeature([NftokenRepository])],
  controllers: [NftokenController],
  providers: [NftokenService],
  exports: [NftokenService, TypeOrmModule],
})
export class NftokenModule {}
