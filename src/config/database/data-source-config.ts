import { DataSource } from 'typeorm';
import { join } from 'path';

import { UserEntity } from 'src/entities/user.entity';

export const AppDataSource = (database: string) =>
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
    entities: [UserEntity],
    migrations: [join(__dirname, '..', '..', '/migrations')],
    migrationsTableName: 'migrations',
  });
