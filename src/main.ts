import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as express from 'express';
import * as basicAuth from 'express-basic-auth';

import { AdmSwagger } from './components/commons/swagger/adm-swagger.config';
import { UserSwagger } from './components/commons/swagger/user-swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: '*' });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));
  app.use(
    'adm/swagger',
    basicAuth({
      challenge: true,
      users: {
        admin: 'admin',
      },
    }),
  );

  SwaggerModule.setup('/user/swagger', app, UserSwagger.getConfig(app));
  SwaggerModule.setup('/admin/swagger', app, AdmSwagger.getConfig(app));

  await app.listen(3000);
  console.log(
    `Cheyni Backend Application is running on: ${await app.getUrl()}`,
  );
}
bootstrap();
