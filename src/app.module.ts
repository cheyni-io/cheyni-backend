import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';

import { MailModule } from './components/commons/modules/mail/mail.module';
import { AuthAdmModule } from './modules/auth/admin-module/auth-adm.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthUserModule } from './modules/auth/user-module/auth-user.module';
import { NfTokenAndUserModule } from './modules/nf-token-and-user/nf-token-and-user.module';
import { NftokenModule } from './modules/nftoken/nftoken.module';
import { UploadModule } from './modules/upload/upload.module';
import { UsersModule } from './modules/users/users.module';

import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './components/commons/exception/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.POSTGRES_HOST,
    //   port: 49275,
    //   username: process.env.POSTGRES_USER,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DATABASE,
    //   entities: ['src/entities/**/*.entity.{ts,js}'],
    //   migrationsTableName: 'migration',
    //   migrations: ['src/migrations/**/*.{ts,js}'],
    //   synchronize: false,
    //   logging: true,
    // }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'roundhouse.proxy.rlwy.net',
      port: 49275,
      username: 'postgres',
      password: '1dAcEEc5DAA*3EC4g63b*3C2CBAAgdBd',
      database: 'railway',
      entities: ['src/entities/**/*.entity.{ts,js}'],
      migrationsTableName: 'migration',
      migrations: ['src/migrations/**/*.{ts,js}'],
      synchronize: false,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    AuthAdmModule,
    AuthUserModule,
    UploadModule,
    NftokenModule,
    NfTokenAndUserModule,
    MailModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
