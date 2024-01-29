import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from 'src/modules/auth/auth.module';
import { signInDTO } from 'src/modules/auth/dto/signIn.dto';
import { GenreDTO } from 'src/modules/genres/dto/genre-responses.dto';
import { GenresModule } from 'src/modules/genres/genres.module';
import { UploadDTO } from 'src/modules/upload/dto/upload-responses.dto';
import { UploadModule } from 'src/modules/upload/upload.module';

import { CreateUserDTO } from 'src/modules/users/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/users/dto/update-user.dto';
import { UsersModule } from 'src/modules/users/users.module';
import { CreateNftokenDto } from 'src/modules/nftoken/dto/create-nftoken.dto';
import { NftokenModule } from 'src/modules/nftoken/nftoken.module';
import { NfTokenAndUserModule } from 'src/modules/nf-token-and-user/nf-token-and-user.module';

const options = new DocumentBuilder()
  .setTitle('Cheyni - API')
  .setDescription('CHEYNI API')
  .setVersion('1.0')
  .addTag('Autenticação')
  .build();

const modules = [
  UsersModule,
  AuthModule,
  UploadModule,
  GenresModule,
  NftokenModule,
  NfTokenAndUserModule,
];

const extraModels = [
  CreateUserDTO,
  UpdateUserDto,
  signInDTO,
  UploadDTO,
  GenreDTO,
  CreateNftokenDto,
];

export class SwaggerConfig {
  public static getData(app: any) {
    return SwaggerModule.createDocument(app, options, {
      include: modules,
      extraModels: extraModels,
    });
  }
}
