import { DataSource } from 'typeorm';
import { join } from 'path';

import { UserEntity } from 'src/entities/user.entity';
import { UploadEntity } from 'src/entities/upload.entity';
import { GenreEntity } from 'src/entities/genres.entity';
import { NFTokenEntity } from 'src/entities/nftoken.entity';
import { NFTokenAndUserEntity } from 'src/entities/nfTokenAndUser.entity';

export const AppDataSource = (database: string) =>
  // new DataSource({
  //   name: database,
  //   type: 'postgres',
  //   host: 'roundhouse.proxy.rlwy.net',
  //   port: 49275,
  //   username: 'postgres',
  //   password: '1dAcEEc5DAA*3EC4g63b*3C2CBAAgdBd',
  //   database: 'railway',
  //   synchronize: true,
  //   migrationsRun: true,
  //   logging: true,
  //   entities: [UserEntity, UploadEntity, GenreEntity],
  //   migrations: [join(__dirname, '..', '..', '/migrations')],
  //   migrationsTableName: 'migrations',
  // });
  new DataSource({
    name: database,
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'postgres',
    synchronize: true,
    migrationsRun: true,
    logging: true,
    entities: [
      UserEntity,
      UploadEntity,
      GenreEntity,
      NFTokenEntity,
      NFTokenAndUserEntity,
    ],
    migrations: [join(__dirname, '..', '..', '/migrations')],
    migrationsTableName: 'migrations',
  });
