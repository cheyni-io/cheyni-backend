import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class AdmSwagger {
  public static getConfig(app: any) {
    return SwaggerModule.createDocument(app, this.getOptions(), {
      include: this.getModules(),
      extraModels: this.getExtraModels(),
    });
  }

  private static getOptions() {
    return new DocumentBuilder()
      .setTitle('Cheyni - Admin Swagger')
      .setDescription('API for Cheyni Admin')
      .setVersion('1.0')
      .addTag('Autenticação')
      .addTag('Usuário')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'Token' })
      .build();
  }

  private static getModules(): any[] {
    return [];
  }

  private static getExtraModels(): any[] {
    return [];
  }
}
