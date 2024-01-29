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
import { NftokenModule } from './modules/nftoken/nftoken.module';
import { NftokenController } from './modules/nftoken/nftoken.controller';
import { NftokenRepository } from './modules/nftoken/nftoken.repository';
import { NftokenService } from './modules/nftoken/nftoken.service';
import { NfTokenAndUserModule } from './modules/nf-token-and-user/nf-token-and-user.module';
import { NfTokenAndUserController } from './modules/nf-token-and-user/nf-token-and-user.controller';
import { NfTokenAndUserRepository } from './modules/nf-token-and-user/nf-token-and-user.repository';
import { NfTokenAndUserService } from './modules/nf-token-and-user/nf-token-and-user.service';

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
    NftokenModule,
    NfTokenAndUserModule,
  ],
  controllers: [
    UsersController,
    AuthController,
    UploadController,
    GenresController,
    NftokenController,
    NfTokenAndUserController,
  ],
  providers: [
    UsersService,
    AuthService,
    UploadService,
    UploadRepository,
    GenresService,
    GenresRepository,
    NftokenRepository,
    NftokenService,
    NfTokenAndUserRepository,
    NfTokenAndUserService,
  ],
})
export class AppModule {}
