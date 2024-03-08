import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class UserSwagger {
  public static getConfig(app: any) {
    return SwaggerModule.createDocument(app, this.getOptions(), {
      include: this.getModules(),
      extraModels: this.getExtraModels(),
    });
  }

  private static getOptions() {
    return (
      new DocumentBuilder()
        .setTitle('Cheyni User - API')
        .setDescription('API for Cheyni User')
        .setVersion('1.0')
        .addTag('Autenticação', 'API de autenticação')
        // .setExternalDoc('Docs', '/clinic/swagger-json')
        .addBearerAuth({
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'Token',
        })
        .build()
    );
  }

  private static getModules(): any[] {
    return [];
  }

  private static getExtraModels(): any[] {
    return [];
  }
}
