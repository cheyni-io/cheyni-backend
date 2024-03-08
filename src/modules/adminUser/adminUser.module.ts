import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from '../../components/commons/modules/mail/mail.module';

import { AdminUserRepository } from './adminUser.repository';

import { AdminUserController } from './adminUser.controller';

import { AdminUserService } from './adminUser.service';
import { AdminEntity } from '../../entities/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdminEntity]), MailModule],
  controllers: [AdminUserController],
  providers: [AdminUserService, AdminUserRepository],
  exports: [AdminUserService],
})
export class AdminUserModule {}
