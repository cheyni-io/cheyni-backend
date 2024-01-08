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
import { GenresModule } from './modules/genres/genres.module';
import { GenresController } from './modules/genres/genres.controller';
import { GenresService } from './modules/genres/genres.service';
import { GenresRepository } from './modules/genres/genres.repository';

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
    GenresModule,
  ],
  controllers: [
    UsersController,
    AuthController,
    UploadController,
    GenresController,
  ],
  providers: [
    UsersService,
    AuthService,
    UploadService,
    UploadRepository,
    GenresService,
    GenresRepository,
  ],
})
export class AppModule {}
