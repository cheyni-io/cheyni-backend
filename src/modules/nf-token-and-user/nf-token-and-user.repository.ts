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

  async hasToken(userId: string, nfTokenId: string): Promise<boolean> {
    const result = await this.createQueryBuilder('nfTokenAndUser')
      .where('nfTokenAndUser.user = :userId', { userId })
      .andWhere('nfTokenAndUser.nftoken = :nfTokenId', { nfTokenId })
      .getOne();

    return !!result; // Retorna true se encontrar uma correspondência, false se não encontrar
  }
}
