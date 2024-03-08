import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { NftokenService } from './nftoken.service';
import { NftokenController } from './nftoken.controller';
import { NftokenRepository } from './nftoken.repository';
import { NFTokenEntity } from '../../entities/nftoken.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NFTokenEntity])],
  controllers: [NftokenController],
  providers: [NftokenService, NftokenRepository],
  exports: [NftokenService, TypeOrmModule],
})
export class NftokenModule {}
