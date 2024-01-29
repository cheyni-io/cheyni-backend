import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { NFTokenAndUserEntity } from 'src/entities/nfTokenAndUser.entity';

@Injectable({ scope: Scope.REQUEST })
export class NfTokenAndUserRepository extends Repository<NFTokenAndUserEntity> {
  constructor(
    @Inject('CONNECTION')
    private readonly nfTokenAndUserDataSource: DataSource,
  ) {
    super(NFTokenAndUserEntity, nfTokenAndUserDataSource.createEntityManager());
  }

  async saveNfTokenAndUser(nfTokenAndUser: NFTokenAndUserEntity) {
    return await this.save(this.create(nfTokenAndUser));
  }
}
