import { Module } from '@nestjs/common';

import { AuthModule } from '../auth.module';

import { AuthAdmController } from './auth-adm.controller';

import { AuthAdmService } from './auth.adm.service';

@Module({
  imports: [AuthModule],
  providers: [AuthAdmService],
  controllers: [AuthAdmController],
})
export class AuthAdmModule {}
