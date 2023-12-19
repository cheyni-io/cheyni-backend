import {
  Global,
  InternalServerErrorException,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { AppDataSource } from './database/data-source-config';

const connectionFactory = {
  provide: 'CONNECTION',
  scope: Scope.REQUEST,
  useFactory: async () => {
    const tenant = 'default';

    const dataSource = AppDataSource(tenant);

    try {
      return await dataSource.initialize();
    } catch (error) {
      throw new InternalServerErrorException('Connection error.');
    }
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [connectionFactory],
  exports: ['CONNECTION'],
})
export class TenancyModule {}
