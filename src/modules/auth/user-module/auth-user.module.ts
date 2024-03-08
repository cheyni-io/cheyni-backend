import { Module } from '@nestjs/common';

import { AuthUserController } from './auth-user.controller';

import { AuthUserService } from './auth-user.service';

import { AuthModule } from '../auth.module';

@Module({
  imports: [AuthModule],
  providers: [AuthUserService],
  controllers: [AuthUserController],
})
export class AuthUserModule {}
