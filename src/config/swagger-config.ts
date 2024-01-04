import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from 'src/modules/auth/auth.module';
import { signInDTO } from 'src/modules/auth/dto/signIn.dto';
import { UploadDTO } from 'src/modules/upload/dto/upload-responses.dto';
import { UploadModule } from 'src/modules/upload/upload.module';

import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { UsersModule } from 'src/modules/users/users.module';

const options = new DocumentBuilder()
  .setTitle('Cheyni - API')
  .setDescription('CHEYNI API')
  .setVersion('1.0')
  .addTag('Autenticação')
  .build();

const modules = [UsersModule, AuthModule, UploadModule];

const extraModels = [CreateUserDTO, UpdateUserDto, signInDTO, UploadDTO];

export class SwaggerConfig {
  public static getData(app: any) {
    return SwaggerModule.createDocument(app, options, {
      include: modules,
      extraModels: extraModels,
    });
  }
}
