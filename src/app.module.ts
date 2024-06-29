import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        entities: ['dist/entities/**/*.entity.{ts,js}'],
        migrationsTableName: 'migration',
        migrations: ['dist/migrations/**/*.{ts,js}'],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
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
