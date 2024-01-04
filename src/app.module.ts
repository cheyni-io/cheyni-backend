import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TenancyModule } from './config/tenancy.module';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { UsersController } from './modules/users/users.controller';
import { UsersModule } from './modules/users/users.module';
import { UsersService } from './modules/users/users.service';
import { UploadModule } from './modules/upload/upload.module';
import { UploadController } from './modules/upload/upload.controller';
import { UploadService } from './modules/upload/upload.service';
import { UploadRepository } from './modules/upload/upload.repository';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    TenancyModule,
    UsersModule,
    AuthModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [UsersController, AuthController, UploadController],
  providers: [UsersService, AuthService, UploadService, UploadRepository],
})
export class AppModule {}
