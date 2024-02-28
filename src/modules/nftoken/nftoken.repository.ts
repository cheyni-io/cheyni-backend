import { Inject, Injectable, Scope } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { NFTokenEntity } from 'src/entities/nftoken.entity';

@Injectable({ scope: Scope.REQUEST })
export class NftokenRepository extends Repository<NFTokenEntity> {
  constructor(
    @Inject('CONNECTION')
    private readonly nftokenDataSource: DataSource,
  ) {
    super(NFTokenEntity, nftokenDataSource.createEntityManager());
  }

  async saveNftoken(nftoken: NFTokenEntity) {
    return this.save(nftoken);
  }

  async updateNftoken(id: string, nftoken: NFTokenEntity) {
    return await this.update(id, nftoken);
  }

  async deleteNftoken(id: string) {
    return await this.delete(id);
  }

  async findAllNftokens() {
    return await this.findAndCount({
      where: {},
    });
  }

  async findNftokenById(id: string) {
    return await this.findOne({
      relations: ['upload'],
      where: {
        id: id,
      },
      select: ['id', 'name', 'token', 'hash', 'createdAt', 'updatedAt'],
    });
  }
}
