import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../../components/commons/modules/mail/mail.module';

import { AdminUserRepository } from './adminUser.repository';

import { AdminUserController } from './adminUser.controller';

import { AdminUserService } from './adminUser.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminUserRepository]), MailModule],
  controllers: [AdminUserController],
  providers: [AdminUserService],
  exports: [AdminUserService],
})
export class AdminUserModule {}
